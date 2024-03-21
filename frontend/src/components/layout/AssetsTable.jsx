import { Table } from 'antd';
import { useCrypto } from '../../context/crypto-context';

// Define the columns for the table
const columns = [
  {
    title: 'Name',
    dataIndex: 'name', // Field in the data source
    sorter: (a, b) => a.name.length - b.name.length, // Sorting function based on the length of the name
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
]

export default function AssetsTable() {
    const {assets} = useCrypto() // Fetching assets data from CryptoContext

    // Process and structure data for table display
    const data = assets.map(a => ({
        key: a.id, // Unique key for each row (required by Ant Design)
        name: a.name,
        price: a.price,
        amount: a.amount,
    }))

    return <Table pagination={false} columns={columns} dataSource={data} />
}