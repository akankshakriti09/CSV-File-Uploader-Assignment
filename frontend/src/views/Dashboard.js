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
  const [file, setFile] = useState();
  const fileReader = new FileReader();

  // This state will store the parsed data
  const [data, setData] = useState([]);

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

  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return alert("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
      });
      const parsedData = csv?.data;
      const rows = Object.keys(parsedData[0]);

      const columns = Object.values(parsedData[0]);
      const res = rows.reduce((acc, e, i) => {
        return [...acc, [[e], columns[i]]];
      }, []);
      console.log(res);
      setData(res);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <>
        <div className="container-fluid" style={{ paddingTop: "100px" }}>
          <div className="row">
            <main
              role="main"
              className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
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
              <form>
                <input
                  // type={"file"}
                  // accept={".csv"}
                  onChange={handleFileChange}
                  id="csvInput"
                  name="file"
                  type="File"
                />
                <button onClick={handleParse}>IMPORT CSV</button>
                <div style={{ marginTop: "3rem" }}>
                  {error
                    ? error
                    : data.map((e, i) => (
                        <div key={i} className="item">
                          {e[0]}:{e[1]}
                        </div>
                      ))}
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
