const { BigQuery } = require('@google-cloud/bigquery');
const { sourceDatasetName, sourceTableName, targetDatasetName, targetTableName } = require('minimist')(process.argv.slice(2));
const bqClient = new BigQuery();

(async () => {
    const sourceDataset = bqClient.dataset(sourceDatasetName);
    const [sourceTable] = await sourceDataset.table(sourceTableName).get();

    const metadata = sourceTable.metadata;
    const schema = metadata.schema;
    const partitionDefinition = metadata.partitionDefinition;
    const timePartitioning = metadata.timePartitioning;
    const rangePartitioning = metadata.rangePartitioning;
    const clustering = metadata.clustering;
    
    const tableCreateOptions = {
        schema: schema,
    }
    if (partitionDefinition) {
        tableCreateOptions.partitionDefinition = partitionDefinition;
    }
    if (timePartitioning) {
        tableCreateOptions.timePartitioning = timePartitioning;
    }
    if (rangePartitioning) {
        tableCreateOptions.rangePartitioning = rangePartitioning;
    }
    if (clustering) {
        tableCreateOptions.clustering = clustering;
    }

    console.log(`Creating table ${targetTableName} at ${targetDatasetName} - with options ${JSON.stringify(tableCreateOptions)}`);
    
    const targetDataset = bqClient.dataset(targetDatasetName);
    const [targetTable] = await targetDataset.createTable(targetTableName, tableCreateOptions);

    console.log(`Table copy completed!`);
})();

