# Generated by Django 5.0.4 on 2024-06-02 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='csv_file',
            field=models.FileField(blank=True, upload_to='csv_files'),
        ),
    ]
