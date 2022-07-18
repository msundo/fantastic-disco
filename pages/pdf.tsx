import type { NextPage } from 'next';
import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { useAppState } from '../context/state';

import React, { useEffect, useState } from 'react';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontSize: 10,
    paddingBottom: 60,
    wordBreak: 'break-all',
    padding: 10,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    // paddingHorizontal: 40,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
  },
  subheading: {
    fontSize: 12,
  },
  section: {
    marginTop: 10,
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(208, 208, 208, 50%)',
    width: '100%',
  },
  flexColumn: {
    flexBasis: '50%',
  },
});

const MyDoc: React.FC = (props: any) => (
  <>
    <Document title={`Barselsplan`}>
      <Page size='A4' style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.subheading}>Planlægning af barsel</Text>
          <Text style={styles.heading}>Sådan ser jeres barselsplan ud</Text>
        </View>

        <Image src='/timeline.png' style={{ width: '100%', height: 'auto' }} />
        <View style={styles.section}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.flexColumn}>
              <Text>{'First partner name'}</Text>
            </View>
            <View style={styles.flexColumn}>
              <Text>{'Second partner name'}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.flexColumn}>
              <Text>{'column 1'}</Text>
            </View>
            <View style={styles.flexColumn}>
              <Text>{'column 2'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}></View>
      </Page>
    </Document>
  </>
);

const Pdf: NextPage = () => {
  // PDF only works in the browser, so rule out SSR
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      <Head>
        <title>PDF</title>
      </Head>

      <div suppressHydrationWarning={true}>
        {!isSSR && (
          <>
            <PDFViewer width={1000} height={500}>
              <MyDoc />
            </PDFViewer>
            <PDFDownloadLink document={<MyDoc />} fileName='somename.pdf'>
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
          </>
        )}
      </div>
      <h1 className='text-5xl mb-8'>PDF</h1>
      <div>PDF yo</div>
    </>
  );
};

export default Pdf;
