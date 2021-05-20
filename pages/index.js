import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
     <ul id="functions">
         <li><Link href="/memories">Memories</Link></li>
         <li><Link href="/logger">Logger</Link></li>
     </ul>
  )
}
