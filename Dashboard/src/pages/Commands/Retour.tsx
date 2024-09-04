import { Box, Center, Skeleton, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { UserState } from '../../hooks/loginHook'
import useCrud from '../../hooks/useCrud'
import CommandTable from './CommandTable'
import { Colors } from '../../Constant/Colors'

export const Retour = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const { token } = UserState() ?? {};
  const { get } = useCrud()

  useEffect(() => {
    const fetchingCommand = async () => {
      console.log('here')
      setLoading(true)
      try {
        const res = await get('api/v1/command?retour=true', token)
        setData(res)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }

    }

    fetchingCommand()
  }, [])
  return (
    <Box
      w="100%"
      bgColor={Colors.primary}
      h="calc(100vh - 40px)"
      p="20px"
      borderRadius="5px"
      boxShadow="md"
      border="2px solid #F3F3F3"
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="30px"
      overflowY="scroll"
    >
      {loading ? (
        <VStack spacing={4} w="100%">
          {/* Skeletons for the loading state */}
          <Skeleton height="40px" w="100%" />
          <Skeleton height="40px" w="100%" />
          <Skeleton height="40px" w="100%" />
        </VStack>
      ) : data.length === 0 ? (
        <Center h="100%">
          <Box textAlign="center">
            <Text mt={4} fontSize="lg" color="gray.500">
              No Retour For The Moment
            </Text>
          </Box>
        </Center>
      ) : (
        data.map((elem) => <CommandTable command={elem} />)
      )}
    </Box>
  )
}
