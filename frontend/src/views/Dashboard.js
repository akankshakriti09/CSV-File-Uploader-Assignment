import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import Papa from "papaparse";

function Dashboard() {
  const [res, setRes] = useState("");
  const api = useAxios();
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decode = jwtDecode(token);
    var username = decode.username;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
      } catch (error) {
        console.log(error);
        setRes("Something went Wrong");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.post("/test/");
        setRes(response.data.response);
      } catch (error) {
        console.log(error);
        setRes("Something went wrong");
      }
    };
    fetchPostData();
  }, []);

  /*For CSV file reading*/

  // Allowed extensions for input file
  const allowedExtensions = ["csv"];

  // It will store the file uploaded by the user
  const [file, setFile] = useState(null);
  // const fileReader = new FileReader();

  // This state will store the parsed data
  const [data, setData] = useState([]);
  const [columnArray, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };

  const handleParse = (e) => {
    e.preventDefault();
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return alert("Enter a valid file");
    console.log(file);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        // setData(results.data.slice(0, 10));
        const columnArray = [];
        const valuesArray = [];

        results.data.map((ele) => {
          columnArray.push(Object.keys(ele));
          valuesArray.push(Object.values(ele));
        });
        setData(results.data);
        setColumn(columnArray[0]);
        setValues(valuesArray.slice(0, 10));
      },
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <>
        <div className="container-fluid" style={{ paddingTop: "100px" }}>
          <div className="row">
            <main
              role="main"
              className="col pt-3 px-4"
            >
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">My Dashboard</h1>
                <span style={{ color: "white" }}>
                  <strong>Hello {username}!</strong>
                </span>
              </div>
              <div className="alert alert-success">
                <strong>{res}</strong>
              </div>
              <h2 style={{ color: "white", fontSize: "22px" }}>
                Upload CSV file
              </h2>
              <form onSubmit={(e) => handleParse(e)}>
                <input
                  onChange={handleFileChange}
                  id="csvInput"
                  name="file"
                  type="File"
                />
                <button>IMPORT CSV</button>
                <div style={{ marginTop: "3rem" }}>
                  {/* <ul>
                    {data?.map(ele => (
                      <li>{ele.EMPLOYEE_ID} | {ele.FIRST_NAME} | {ele.LAST_NAME} | {ele.EMAIL} | {ele.PHONE_NUMBER} | {ele.JOB_ID} |  {ele.SALARY} | {ele.HIRE_DATE} | {ele.MANAGER_ID} </li>
                    ))}
                  </ul> */}

                  <br />
                  <table
                    style={{
                      borderCollapse: "collapse",
                      border: "1px solid black",
                      margin: "5px auto",
                    }}
                  >
                    <thead>
                      <tr>
                        {columnArray.map((col, i) => (
                          <th style={{ border: "1px solid black" }} key={i}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {values.map((v, i) => (
                        <tr key={i}>
                          {v.map((value, i) => (
                            <td style={{ border: "1px solid black" }} key={i}>
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </form>
            </main>
          </div>
        </div>
      </>
    </div>
  );
}

export default Dashboard;
