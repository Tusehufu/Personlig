import styles from './Menu.module.css'
import Link from 'next/link';

export default function Navigation () {
    return (<div className={styles.grid}>
    <MenuLink text ="Hem" href="/" description="Hem" />
    <MenuLink text ="Kontakt" href="contact" description="Kontakta oss" />
    <MenuLink text ="Produktbeskrivning" href="/Products" description="En beskrivning" />
    <MenuLink text ="Tillgänglighet" href="/" description="Tillgänglighet" />
    <MenuLink text ="Målgrupp" href="/about" description="Projektets målgrupp" />


    </div>);
}

function MenuLink({ text, href, description}) {
    return (<Link href={href}
        className={styles.card}>
           <h2>
            {text} 
            </h2> 
            <p>{description}</p>
        </Link>)
}