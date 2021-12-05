import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import {
  Stack,
  Box,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import Header from '../components/Header'
import DemoPageLinks from '../components/DemoPageLinks'
import Link from 'next/link'
import Head from 'next/head';
import Layout from '../components/Layout';
import { getSortedList } from '../lib/data';


const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}


export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: {
      allData
    },
    revalidate: 60
   
  };
}
export function Home({ allData }) {
  const AuthUser = useAuthUser()
  const styles = {
    content: {
      padding: 32,
    },
    infoTextContainer: {
      marginBottom: 32,
    },
  }
  return (
      <Layout home>
        <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      
      <Flex
       w={'full'}
       h={'100vh'}
       backgroundImage={
         'url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'
       }
       backgroundSize={'cover'}
       backgroundPosition={'center center'}>
       <VStack
         w={'full'}
         justify={'left'}
         py={useBreakpointValue({ base: 8, md: 4 })}
         px={useBreakpointValue({ base: 4, md: 8 })}
         bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          
         <Stack maxW={'3xl'} align={'flex-start'} spacing={6}>
           <Box
           m={[2, 3]}
           p={5,10}
           color='white'
           border='1px' borderColor='white' >
           <Text
             color={'white'}
             fontWeight={700}
             lineHeight={1.2}
             fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
             Welcome to my first app!</Text>
             
              <Text
             color={'white'}
             fontWeight={400}
             lineHeight={1}
             fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}>Make yourself at home exploring a place for storing your contacts, todos and events.
           
           <br/><br/>
             Try out the navigational elements and see if they make sense.
           
           </Text>
           </Box>
           <Stack direction={'column'}>
             <Button
               bg={'blue.400'}
               rounded={'full'}
               color={'white'}
               _hover={{ bg: 'blue.500' }}>
               <a href="/todo" style={{ fontSize: "25px" }}>Create a To Do</a>
             
             </Button>
             <Button
               bg={'blue.300'}
               rounded={'full'}
               color={'white'}
               _hover={{ bg: 'blue.500' }}> <a href="/event" style={{ fontSize: "25px" }}>Create an Event</a>
               
             </Button>
             <Button
               bg={'blue.300'}
               rounded={'full'}
               color={'white'}
               _hover={{ bg: 'blue.500' }}>
               <a href="/contact" style={{ fontSize: "25px"}}>Create a Contact</a>
         
               
             </Button>
             
             </Stack>
             
             
             <Stack direction={'column'}>
               <Box
                m={[2, 3]}
                p={5,10}
                color='white'
                border='1px' borderColor='white' >
             <Text
             color={'white'}
             fontWeight={700}
             lineHeight={1.2}
             fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>

             <div className="card-body" backgroundSize="60" bgColor="white">
          <h1 className="card-title">Posts from WordPress:</h1>
             
         </div></Text>
         <div className="list-group">
         
           {allData.map(({ id, name }) => (
             <><Text
             color={'lightblue'}
           
             lineHeight={1}
             fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}>
    
             <Link key={id} href={`wordpress/${id}`}>
               <a className="list-group-item list-group-item-action">{name}</a>
             </Link>
             </Text>
           </>
           ))}
           
           
           
           </div>
           </Box>
           </Stack>
         </Stack>
       </VStack>
       
     </Flex> 
          
      </Layout>
  );
}




    
  

{/*export const getServerSideProps = withAuthUserTokenSSR()()*/}


export default withAuthUser()(Home)









