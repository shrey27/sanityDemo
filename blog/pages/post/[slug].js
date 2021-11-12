import client from '../../client';
import styles from '../../styles/Post.module.css';
// import Navbar from '../../components/navbar';

const source =
  'https://images.unsplash.com/photo-1543961955-5efef0ac54d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80';

const Post = (props) => {
  const { title = '404 | Not Found', mainImage, body } = props;
  return (
    <div className={styles.container}>
      {/* <Navbar /> */}
      <div className={styles.image}>
        <img src={source} alt='background' />
      </div>
      <div className={styles.post}>
        <h1 className={styles.title}>{title}</h1>
        {mainImage && (
          <div className={styles.box}>
            <img
              className={styles.img}
              src={mainImage.asset.url}
              alt={mainImage.alt}
            />
            <p className={styles.paragraph}>{body[0].children[0].text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const query = `*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage{
      asset->{
          _id,
          url
      },
      alt
  },
  body
}`;

Post.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query;
  return await client.fetch(query, {
    slug,
  });
};

export default Post;
