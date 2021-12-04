import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllIds, getData } from '../../lib/data';

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
  return (
    <Layout>
      <article className="card col-6">
      <h2>Post Details</h2>
        <div className="card-body">
          <h5 className="card-title">Post Title: {itemData.post_title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">User login: {itemData.user_login}</h6>
          <h6 className="card-subtitle mb-2 text-muted">User email: {itemData.user_email}</h6>
          <div className="card-text" dangerouslySetInnerHTML={{ __html:itemData.post_content}} />
          {/*<p className="card-text">{itemData.birthdate}</p>
          <a href={'mailto:' + itemData.email} className="card-link">{itemData.email}</a>
        </div>*/}
        </div>
      </article>
      
      
    </Layout>
  );
}