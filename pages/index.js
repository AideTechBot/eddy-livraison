import Head from 'next/head'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import {RESTAURANT_DATA} from './data.js'

config.autoAddCss = false;
library.add(faCheck);
library.add(faTimes);

function displayPhone(n) {
  return `+${n[0]} (${n.substring(1,4)}) ${n.substring(4,7)}-${n.substring(7,11)}`;
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

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Eddy-Livraisons</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Une liste dédiée aux livraisons dans la région d'Edmundston" />
      </Head>

      <main>
        <h1 className="title">
           O&ugrave; manger?
        </h1>

        <p className="description">
          Une liste d&eacute;di&eacute;e aux livraisons dans la r&eacute;gion d'Edmundston.
        </p>

      <div className="rest-container">
        {RESTAURANT_DATA.map(rest => (
          <div className="rest-rows" key={rest.name}>
            <div className="rest-header">
              <b>
                {rest.name}
              </b>
              <br/>
              <span>
                {rest.address}
              </span>
            </div>
            <div className="rest-after">
              <CheckLabel label="Dine-In" checked={rest.dineIn} />
              <CheckLabel label="Take-Out" checked={rest.takeOut} />
              <CheckLabel label="Pickup" checked={rest.curbsidePickup} />
            </div>
            <div className="rest-buttons">
              <a href={rest.orderURL}>
                <button title={rest.orderURL} type="button">
                  Commandez
                </button>
              </a>
              <a href={`tel:${rest.phoneNumber}`}>
                <button title={displayPhone(rest.phoneNumber)} type="button">
                  Appelez
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      </main>

      <footer>
        Cr&eacute;&eacute; par&nbsp;
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
          border: 1px solid #eaeaea;
          padding: 10px;
        }

        .rest-rows {
          border: 1px solid #eaeaea;
          padding: 10px;
          display: flex;
          justify-content: space-between;
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

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
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

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
