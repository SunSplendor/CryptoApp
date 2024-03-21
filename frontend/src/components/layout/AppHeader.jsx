import { Layout, Select, Space, Button, Modal, Drawer, } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import {useState, useEffect} from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

// Styles for the header
const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};


export default function AppHeader() {
  const [select, setSelect] = useState(false)    // State for handling select component visibility
  const [coin, setCoin] = useState(null)        // State to store selected coin
  const [modal, setModal] = useState(false)     // State for modal visibility
  const [drawer, setDrawer] = useState(false)   // State for drawer visibility
  const {crypto} = useCrypto()                  // Fetch crypto data from context

  // Effect for handling keypress event
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev) // Toggle select visibility on '/' keypress
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress) // Cleanup event listener
  }, [])

  // Function to handle selection of a coin
  function handleSelect(value) {
    setCoin(crypto.find(c => c.id === value)) // Find and set the selected coin
    setModal(true) // Open the modal
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value='press "/" to open' 
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
        <Space>
            <img style={{width: 20}} src={option.data.icon} alt={option.data.label} /> {option.data.label}
        </Space>
        )}
      />

      {/* Button to open the drawer for adding a new asset */}
      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

      {/* Modal for displaying coin information */}
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
      <CoinInfoModal coin={coin} />
      </Modal>

      {/* Drawer for adding a new asset */}
      <Drawer width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
    </Layout.Header>
  )
}