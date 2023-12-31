import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import logo from '../../images/tarumtLogo.png';
import './studentLayout.css';
import { storeIPAddress } from '../../supabase-client';

const { Header, Footer, Sider, Content } = Layout;

function PageLayout() {

    const [currentKey, setCurrentKey] = useState('/');

    const navigate = useNavigate();

    const { signOut } = useAuth();

    const items = [
        {
            key: '/home',
            label: 'Home',
        },
        {
            key: '/application',
            label: 'Application',
        },
        {
            key: '/academician',
            label: 'Academician'
        },
        {
            key: '/studentInquiry',
            label: 'Inquiry',
        },
        // {
        //     key: '/logout',
        //     label: 'Logout',
        // },
    ];

    const handleClick = async (e) => {
        setCurrentKey(e.key);
        navigate(`/student${e.key}`);
    }

    const handleLogout = async () => {
        storeIPAddress("SIGNED_OUT", "student");
        await signOut();
        navigate('/login');
    }


    function Navbar() {
        return (

            <div className="navBarClass">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '1em',
                }} >
                    <Link to="/student/">
                        <img
                            src={logo}
                            alt="logo"
                            style={{
                                height: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '2em',
                                marginTop: '1em',
                                marginBottom: '1em',
                            }}
                        />
                    </Link>
                    <Menu
                        defaultSelectedKeys={[currentKey]}
                        onClick={handleClick}
                        items={items}
                        mode='horizontal'

                        style={{
                            width: '80%',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'start',
                            flex: 'auto',
                            minWidth: '0',
                            marginLeft: '2em',
                        }}

                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '10%',
                        marginRight: '1.5em',
                        fontSize: '1.2em',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: '#eea500',
                        color: '#fff',
                        boxSizing: 'border-box',
                    }}
                        onClick={handleLogout}
                    >
                        Logout
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Layout>
                <Header style={{ backgroundColor: 'white', height: '6.5em' }}>
                    <Navbar />
                </Header>
                <Content style={{ backgroundColor: 'white', padding: '20px' }}>
                    <Outlet />
                </Content>
                {/* <Footer>Footer</Footer> */}
            </Layout>
        </>
    )

}

export default PageLayout;