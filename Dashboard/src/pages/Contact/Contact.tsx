import { Box, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Colors } from '../../Constant/Colors';
import useCrud from '../../hooks/useCrud';
import { UserState } from '../../hooks/loginHook';
import { Item } from '../../components/Contact/Item';

export const Contact = () => {
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { get } = useCrud();
    const { token } = UserState() ?? {};

    

    useEffect(() => {
        const fetchingData = async () => {
            setLoading(true);
            try {
                const res = await get('api/v1/contact', token);
                console.log(res);
                setData(res.reverse());
            } catch (error: any) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchingData();
    }, []);

    if (loading) {
        return (
            <Box p="20px 20px 20px 270px" display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Spinner size="xl" color={Colors.primary} />
            </Box>
        );
    }

    return (
        <Box p="20px 20px 20px 270px">
            <Box
                w="100%"
                bgColor={Colors.primary}
                p="20px"
                borderRadius="8px"
                boxShadow="md"
                border="1px solid #e2e8f0"
                bg="gray.50"
                display="flex"
                flexDir="column"
                gap="20px"
            >
                {data.map((elem: any) => (
                    <Item elem={elem} key={elem._id} />
                ))}
            </Box>
        </Box>
    );
};
