import { Layout, Spin, message } from 'antd';
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import { useContext, useEffect } from 'react';
import CryptoContext from '../../context/crypto-context';


export default function AppLayout() {
    const { loading } = useContext(CryptoContext)
    const [messageApi, contextHolder] = message.useMessage();

    // Function to show a hint message
    const showHintMessage = () => {
        setTimeout(() => {
            messageApi.open({
                type: 'info',
                content: (
                    <span>
                        Use the left menu for the latest updates on cryptocurrencies. <br />
                        The right menu is your tool to add new assets to your wallet.
                    </span>
                ),
                duration: 7,
            });
        }, 1000);
    };

    useEffect(() => {
        if (!loading) {
            showHintMessage(); // Call the function to show the message
        }
    }, [loading]);

    if (loading) {
        return <Spin fullscreen />
    }

    return (
        <>
            {contextHolder} {/* Include contextHolder to mount the message component */}
            <Layout>
                <AppHeader />
                <Layout>
                    <AppSider />
                    <AppContent />
                </Layout>
            </Layout>
        </>
    )
}