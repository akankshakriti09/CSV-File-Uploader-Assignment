# Generated by Django 5.0.4 on 2024-06-02 10:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_profile_csv_file'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='profile',
            options={'verbose_name': 'csv_file', 'verbose_name_plural': 'CSV File'},
        ),
    ]
