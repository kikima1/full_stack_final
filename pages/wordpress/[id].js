import Head from 'next/head';
import Layout from '../../components/Layout';
import { getAllIds, getData } from '../../lib/data';
import {
    Heading,
    InputGroup,
    InputLeftElement,
    Input,
    Stack,
    Flex,
    Box,
    Button,
    Text,
    VStack,
    useBreakpointValue,
    IconButton,
    Divider,
    Link,
  } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { AddIcon } from "@chakra-ui/icons";
import Header from '../../components/Header';
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';
import { getFirebaseAdmin } from 'next-firebase-auth';
import firebase from 'firebase/app';
import 'firebase/firestore';


export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
  // console.log(itemData);
  return {
    props: {
      itemData
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false
  };
}

//added extra item data from list one which had changed data from second JSON object 
export default function Entry({ itemData }) {
    const AuthUser = useAuthUser();
  return (
      
    <Layout home>
        <Header 
        email={AuthUser.email} 
        signOut={AuthUser.signOut} />
        <Box
        m={[2, 3]}
        p={5,10}
        color='gray.50'
        border='1px' borderColor='gray.200' >
      <Text
             color={'black'}
             fontWeight={700}
             lineHeight={4.0}
             fontSize={useBreakpointValue({ base: '2xl', md: '3xl' })}>
                 Post Details
           
           </Text>
           <Text
             color={'black'}
             fontWeight={500}
             lineHeight={1}
             fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })}>
                 
           
           <br/><br/>    
           
           
      <article className="card col-6">
      
        <div className="card-body">
          <h5 className="card-title">Post Title: {itemData.post_title}</h5>
          </div>
          </article>
          
          <h6 className="card-subtitle mb-2 text-muted">User login: {itemData.user_login}</h6>
          <h6 className="card-subtitle mb-2 text-muted">User email: {itemData.user_email}</h6>
          <Box
          m={[2, 3]}
          p={5,10}
          color='gray.50'
          border='1px' borderColor='gray.200'>
         <Text 
         color={'black'}> <p className="card-text" dangerouslySetInnerHTML={{__html:itemData.post_content}}/>
         </Text>
          </Box>
          
          </Text>
      
      <br></br>
      <Button
               bg={'blue.400'}
               rounded={'full'}
               color={'white'}
               _hover={{ bg: 'blue.500' }}>
               <a href="/" style={{ fontSize: "15px" }}>Home</a>
               </Button>
               
               </Box>             
    </Layout>
    
  );
}