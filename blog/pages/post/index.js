import Link from 'next/link';
import client from '../../client';
// import { useEffect, useState } from 'react';
import styles from '../../styles/Blogs.module.css';
import Navbar from '../../components/navbar';
const source =
  'https://images.unsplash.com/photo-1502790671504-542ad42d5189?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80';

const Post = (props) => {
  const { posts } = props;  
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.image}>
        <img src={source} alt='background' />
      </div>
      <h1 className={styles.heading}>Space blogs!</h1>
      <ul className={styles.list}>
        {posts &&
          posts.map(
            ({ _id, title = '', slug = '', _updatedAt = '', mainImage }) =>
              slug && (
                <li key={_id+title}>
                  <div className={styles.item}>
                    <img src={mainImage.asset.url} alt='postImage' />
                    <Link href='/post/[slug]' as={`/post/${slug.current}`}>
                      <span className={styles.title}>{title}</span>
                    </Link>
                  </div>
                </li>
              )
          )}
      </ul>
    </div>
  );
};

const query = `*[_type == "post"]{
  title,
  slug,
  mainImage{
      asset->{
          _id,
          url
  },
  alt
}
}`;


export async function getStaticProps(){
  const data = await client.fetch(query);
  return {
    props: {
      posts:data,
    },
  };
};

export default Post;
