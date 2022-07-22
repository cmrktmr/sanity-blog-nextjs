import ImageUrlBuilder from '@sanity/image-url'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Toolbar } from '../components/toolbar'
import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  console.log(posts, "posts")
  const [mappedPosts, setMappedPosts] = useState([])
  const router = useRouter()
  useEffect(() => {

    if (posts.length) {
      const imgBuilder = ImageUrlBuilder({
        projectId: '2xifp9z2',
        dataset: 'production',
      })

      setMappedPosts(
        posts.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250)
          }
        })
      )

    } else {
      setMappedPosts([])
    }
  }, [posts])

  return (
    <div>
      <Toolbar />
      <div className={styles.main}>
        <h1>Welcome to my sanity poc</h1>

        <h3>Recent Posts:</h3>

        <div className={styles.feed}>
          {mappedPosts.length ? mappedPosts.map((p, index) => (
            <div onClick={() => router.push(`/post/${p.slug.current}`)} key={index} className={styles.post}>
              <h3>{p.title}</h3>
              <img className={styles.mainImage} src={p.mainImage} />

            </div>
          )) : <>No posts yet</>}
        </div>
      </div>
    </div>
  )
}


export const getServerSideProps = async pageContext => {
  const query = encodeURIComponent('*[ _type == "post" ]')
  const url = `https://2xifp9z2.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then(res => res.json())


  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: []
      }
    }
  } else {
    return {
      props: {
        posts: result.result
      }
    }
  }
}