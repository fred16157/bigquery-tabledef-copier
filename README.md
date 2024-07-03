# bigquery-tabledef-copier

It is a script that copies BigQuery table's definition without data in the table, and that's it.

Currently it is only supporting copies for table's schema, partitioning and clustering definitions.

## Usage

Before running the script, please check your GOOGLE_APPLICATION_CREDENTIALS environment variable is set.

```
node index.js --sourceDatasetName=<SOURCE_DATASET_NAME> --sourceTableName=<SOURCE_TABLE_NAME> --targetDatasetName=<TARGET_DATASET_NAME> --targetTableName=<TARGET_TABLE_NAME>
```
