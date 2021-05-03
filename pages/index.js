import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router"
import React from 'react'
import { useIntl } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import {RESTAURANT_DATA} from '../data.js'
import * as ga from '../content/lib/ga'

config.autoAddCss = false;
library.add(faCheck);
library.add(faTimes);

function displayPhone(n) {
  return `+${n[0]} (${n.substring(1,4)}) ${n.substring(4,7)}-${n.substring(7,11)}`;
}

function isOpen(hours) {
  let d = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Moncton"}));
  let n = d.getDay();
  let now = d.getHours() + "." + d.getMinutes();
  let day = hours[n];

  if ((now > day[0] && now < day[1])) {
    return true;
  } else {
    return false;
  }
}

function CheckLabel(props) {
  const { checked, label } = props;
  const checkIcon = c => c ? 
    <FontAwesomeIcon style={{ color: 'green', width: '16px', height: '16px' }} icon="check" />
    : 
    <FontAwesomeIcon style={{ color: 'red', width: '16px', height: '16px' }} icon="times" />
  return (
    <>
    <span className="checked-label">
      {label}&nbsp;{checkIcon(checked)}
    </span>
    <style jsx>{`
      .checked-label {
        padding: 2px;
        white-space: nowrap;
      }
    `}</style>
    </>
  );
}

// this is a dirty trick to show the longest word
// when its hidden so that the box is big enough
function SecondButton(prop) {
  const { open, format } = prop;
  const arr = [
    format("frontPageOrder"),
    format("frontPageCall"),
    format("frontPageClosed"),
  ];
  const max = arr.reduce((a, b) =>
    a.length > b.length ? a : b
  );
  return open ? <>{format("frontPageCall")}</> : <>{max}</>;
};

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const nextLocale = locale === "en" ? "fr" : "en";
  const { formatMessage } = useIntl();
  const format = id => formatMessage({ id });

  const onClick = (type, restName, open) => {
    if(open && typeof window !== "undefined") {
      ga.event({
        action: type,
        params : {
          restaurant_name: restName
        }
      });
    }
  }

  const page = {
    title: "Eddy-Livraison",
    description: format("frontPageHeadline"),
    url: `https://eddy-livraison.com/${locale}`,
    image: "https://eddy-livraison.com/unfurl_logo.png",
    author: "Eddy-Livraison",
  }
  return (
    <div className="container">
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={page.description} />


        <meta name="twitter:title" content={page.title} />
        <meta
          name="twitter:description"
          content={page.description}
        />
        <meta name="twitter:image" content={page.image} />

        <meta property="og:title" content={page.title} />
        <meta
          property="og:description"
          content={page.description}
        />
        <meta property="og:url" content={page.url} />
        <meta name="image" property="og:image" content={page.image} />
      </Head>
      <main>
        <h1 className="title">
          {format("frontPageHeader")}
        </h1>

        <p className="description">
          {format("frontPageHeadline")}
        </p>
        <span className="locale-link">
          <Link
            href={`/${nextLocale}`} 
            locale="fr"
          >
            <a style={{ color: "#0070f3", textDecoration: 'none' }}>{format("frontPageLocaleLink")}</a>
          </Link>
        </span>

      <div className="rest-container">
        {RESTAURANT_DATA.map(rest => {
          const open = isOpen(rest.openHours);
          const canCall = rest.phoneNumber.length !== 0;
          const canOrder = rest.orderURL.length !== 0;
          const callVisible = canCall && open ? 'visible' : 'hidden';
          const orderVisible = canOrder || !open ? 'visible' : 'hidden';
          return (
            <div className="rest-rows" key={rest.name}>
              <div className="rest-header">
                <h2>
                  {rest.name}
                </h2>
                <br/>
                <span>
                  {rest.address}
                </span>
              </div>
              <div className="rest-after">
                <CheckLabel label={format("frontPageDineIn")} checked={rest.dineIn} />
                <CheckLabel label={format("frontPageTakeOut")} checked={rest.takeOut} />
                <CheckLabel label={format("frontPageDelivery")} checked={rest.delivery} />
              </div>
              <div className="rest-buttons">
                  <a href={rest.orderURL} style={{visibility: orderVisible}} onClick={() => onClick("Order", rest.name, open)}>
                    <button disabled={!open} title={rest.orderURL} type="button" style={{visibility: orderVisible}}>
                      {open ? format("frontPageOrder") : format("frontPageClosed")}
                    </button>
                  </a>
                  <a style={{visibility: callVisible }} href={`tel:${rest.phoneNumber}`} onClick={() => onClick("Call", rest.name, open)}>
                    <button style={{visibility: callVisible }} disabled={!open} title={displayPhone(rest.phoneNumber)} type="button">
                      {/* I'm shimming the flex box with text here I know */}
                      <SecondButton open={open} format={format} />
                    </button>
                  </a>
              </div>
            </div>
          );
        })}
      </div>

        <p style={{ textAlign: 'center',  paddingTop: '2em'}}>
          {format("frontPageFeedback")}
          <br/>
          <a 
            style={{ color: '#0070f3', textDecoration: 'none' }} 
            className="contact"
            href="mailto:help@eddy-livraison.com?subject=[Issue with Eddy-Livraison]"
          >
            {format("frontPageContactMe")}
          </a>
        </p>

      </main>

      <footer>
        {format("frontPageFooter")}&nbsp;
        <a
          href="https://mdionne.me"
          target="_blank"
          rel="noopener noreferrer"
          className="manuel-link"
        >
          Manuel
        </a>
      </footer>

      <style jsx>{`
        .rest-container {
          border: 2px solid #eaeaea;
          padding: 10px;
        }

        .rest-rows {
          border-top: 2px solid #eaeaea;
          border-right: 2px solid #eaeaea;
          border-left: 2px solid #eaeaea;
          padding: 10px;
          display: flex;
          justify-content: space-between;
        }

        .rest-rows:last-child {
          border-bottom: 2px solid #eaeaea;
        }

        .disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .rest-header {
          flex: 1.1;
        }

        .rest-header span {
          font-size: small;
        }

        .rest-after {
          flex: 1;
          padding: 0 10px;
          display: flex;
          flex-wrap: wrap;
        }

        .rest-buttons {
          display: flex;
          flex-direction: column;
          flex: 0.5;
        }
        .rest-buttons div {
          text-align: center;
          margin: auto auto;
          text-decoration: none;
          color: red;
          font-size: 16px;
          cursor: not-allowed;
        }

        .rest-buttons a {
          width: 100%;
          height: 100%
        }
        .rest-buttons a button {
          width: 100%;
          height: 100%;
          background-color: #008CBA;
          border: 1px solid #ffffff;
          color: white;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;0%;
          transition-duration: 0.2s;
        }

        .rest-buttons a button:hover {
          background-color: #015975;
        }

        .rest-buttons a button:disabled {
          background-color: #dddddd;
          cursor: not-allowed;
          color: #828282;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .locale-link {
          padding-bottom: 2em;
        }

        main {
          padding: 2.5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 200px;
          height: 50px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .manuel-link {
          color: #0070f3;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        h2 {
          font-size: 16px;
          display: inline;
          margin-block-start: auto;
          margin-block-end: auto;
          margin-inline-start: auto;
          margin-inline-end: auto;
          margin-top: 0;
          margin-bottom: 0;
          font-weight: bold;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
