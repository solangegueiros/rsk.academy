import ReactPDF, { Document, View, Page, Svg, Path, Text, StyleSheet, Link, Font, usePDF } from '@react-pdf/renderer'
import { useTranslation } from 'next-i18next'

import { useAppSelector } from '@store'

Font.register({ family: 'Style Script', src: '/font/StyleScript.ttf' })
Font.register({ family: 'Rubik', fontWeight: 'normal', src: '/font/Rubik-Regular.ttf' })
Font.register({ family: 'Rubik', fontWeight: 'bold', src: '/font/Rubik-Medium.ttf' })

const styles = StyleSheet.create({
  page: {
    fontSize: 20,
    lineHeight: 1.5,
    position: 'relative',
    padding: 10,
    backgroundColor: '#00B43C',
    fontFamily: 'Rubik',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  flex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' },
  container: {
    padding: 30,
    borderWidth: 3,
    borderColor: '#00B43C',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  content: { paddingVertical: 30 },
  title: { fontSize: 60, color: '#00B43C', fontFamily: 'Style Script' },
  name: { fontSize: 40, color: '#00B43C', fontFamily: 'Rubik', fontWeight: 'bold' },
  link: { color: '#00B43C', marginTop: 20 },
  account: { fontSize: 16 },
})

export const useCertificatePdf = (): ReactPDF.UsePDFInstance => {
  const { t } = useTranslation('common')
  const { account } = useAppSelector(state => state.identity)
  const { studentName, studentActiveClassName, activeClass } = useAppSelector(state => state.profile)

  const Doc = (
    <Document>
      <Page size='A4' orientation='landscape' style={styles.page}>
        <View style={styles.container}>
          <View style={styles.flex}>
            {/* Academy Logo */}
            <Svg viewBox='0 0 216 129' width={120}>
              <Path
                fill='currentColor'
                d='M97.73 122.79h-2.27l6.72-18.01h3.07l6.72 18.01h-2.27l-1.35-3.68h-9.22l-1.4 3.68zm1.89-5.34h8.2l-4.09-10.78-4.11 10.78zM126.2 114.11l-1.89.26c-.48-1.89-2.3-3.27-4.34-3.27-2.71 0-4.78 2.22-4.78 5.26 0 3.04 2.04 5.24 4.78 5.24 2.09 0 3.83-1.35 4.34-3.19l1.92.26c-.59 2.71-3.22 4.65-6.26 4.65-3.91 0-6.72-2.91-6.72-6.95s2.84-6.97 6.72-6.97c3.11-.02 5.74 1.97 6.23 4.71zM140.66 109.89h1.94v12.9h-1.94v-2.27c-1.1 1.71-2.96 2.78-5.19 2.78-3.86 0-6.64-2.94-6.64-6.95 0-4.04 2.79-6.97 6.64-6.97 2.22 0 4.09 1.07 5.19 2.81v-2.3zm-.02 6.46c0-3.01-2.1-5.19-4.93-5.19-2.86 0-4.93 2.17-4.93 5.19 0 2.99 2.07 5.19 4.93 5.19 2.83 0 4.93-2.2 4.93-5.19zM152.6 109.38c2.17 0 3.99 1.02 5.08 2.68v-8.05h1.94v18.78h-1.89v-2.22c-1.1 1.69-2.94 2.73-5.14 2.73-3.86 0-6.67-2.94-6.67-6.95.01-4.03 2.82-6.97 6.68-6.97zm-4.73 6.97c0 2.96 2.1 5.06 4.93 5.06 2.86 0 4.93-2.15 4.93-5.06 0-2.94-2.07-5.08-4.93-5.08s-4.93 2.15-4.93 5.08zM169.79 109.38c3.93 0 6.77 2.89 6.77 6.85 0 .23 0 .48-.02.77l-11.6-.02c.31 2.71 2.25 4.57 4.8 4.57 1.99 0 3.88-1.23 4.47-2.91l1.92.31c-.79 2.53-3.45 4.37-6.31 4.37-3.99 0-6.87-2.99-6.87-7.1 0-3.95 2.86-6.84 6.84-6.84zm4.73 5.93c-.36-2.45-2.25-4.14-4.8-4.14-2.5 0-4.37 1.69-4.73 4.11l9.53.03zM179.89 109.89h1.89v1.61c.82-1.33 2.17-2.12 3.83-2.12 2.12 0 3.86 1.07 4.57 2.71.82-1.64 2.43-2.68 4.47-2.68 3.01 0 5.16 2.35 5.16 5.67v7.72h-1.97v-7.74c0-2.27-1.43-3.88-3.42-3.88-2.15 0-3.63 1.61-3.63 3.88v7.74h-1.94v-7.74c0-2.32-1.35-3.88-3.42-3.88-2.15 0-3.6 1.56-3.6 3.88v7.74h-1.94v-12.91zM203.22 126.4c.59.2 1.23.36 1.71.36 1.89 0 2.45-2.04 3.3-3.99l-5.8-12.88h2.15l4.6 10.47 4.04-10.47h2.07l-5.14 13.08c-1.17 2.94-2.22 5.52-4.93 5.52-.64 0-1.41-.15-1.99-.38v-1.71h-.01zM95.46 100.99V54.67l9.51-1.17 1.47 7.26c3.11-4.98 7.62-7.48 13.53-7.48 1.24 0 2.25.06 3.02.17l-.17 9.46c-1.15-.17-2.35-.26-3.59-.26-4.18 0-7.3 1.11-9.36 3.33-2.06 2.22-3.09 5.3-3.09 9.25v25.76H95.46zM144.67 101.85c-7 0-12.6-1.2-16.81-3.59l1.17-8.51c1.9 1.04 4.32 1.97 7.26 2.79 2.94.82 5.62 1.23 8.04 1.23 2.51 0 4.46-.47 5.86-1.41 1.4-.94 2.11-2.31 2.14-4.13 0-1.64-.65-2.94-1.97-3.89-1.31-.95-3.81-2.13-7.5-3.54-1.27-.46-2.09-.76-2.46-.91-4.38-1.7-7.53-3.59-9.46-5.68-1.93-2.09-2.9-4.92-2.9-8.49 0-4.32 1.56-7.63 4.69-9.94 3.12-2.3 7.48-3.46 13.07-3.46 6.05 0 11.37 1.14 15.95 3.41l-2.81 7.82c-4.52-2.1-8.83-3.16-12.92-3.16-2.28 0-4.06.38-5.34 1.15-1.28.76-1.92 1.92-1.92 3.48 0 1.47.62 2.61 1.86 3.44 1.24.82 3.66 1.89 7.26 3.22.11.03.49.16 1.12.39.63.23 1.12.42 1.47.56 4.35 1.58 7.55 3.48 9.59 5.68 2.05 2.2 3.07 5.08 3.07 8.62-.03 4.75-1.64 8.43-4.84 11.02-3.2 2.61-7.74 3.9-13.62 3.9zM194.66 73.94l19.36-20.45h-13.48l-19.32 19.9V38.01l-11.32 2.11v60.87h11.33V88.13l6.24-6.59 14.11 19.45h13.7l-20.62-27.05z'
              />
              <Path fill='#006E3C' d='M64.18 67.43l19.6-11.15s-6.77-4.54-13.48-.72c-6.71 3.82-6.12 11.87-6.12 11.87z' />
              <Path fill='#00B43C' d='M83.78 56.29s.45 8.14-6.27 11.96c-6.72 3.82-13.33-.81-13.33-.81l19.6-11.15z' />
              <Path fill='#006E3C' d='M30.88 46.69V2.6S16.62 9.71 16.62 24.82s14.26 21.87 14.26 21.87z' />
              <Path fill='#00B43C' d='M30.88 2.6s14.26 7.11 14.26 22.22-14.26 21.87-14.26 21.87V2.6z' />
              <Path
                fill='currentColor'
                d='M84.72 54.51c-.35-.19-8.61-4.55-15.59-.51-5.6 3.23-6.71 9.72-6.94 12.42l-2.58 1.49c-1.29-1.27-3.05-2.05-4.99-2.05-1.92 0-3.67.76-4.95 2.01l-11.84-6.84c.14-.55.21-1.13.21-1.72 0-3.26-2.19-6.02-5.17-6.87v-4.21c3.45-2.22 14.4-10.27 14.4-23.09C47.27 10.3 32.56 1.03 31.93.65L30.88 0l-1.04.65c-.63.38-15.34 9.65-15.34 24.49 0 12.82 10.95 20.87 14.4 23.09v4.21c-2.99.86-5.17 3.61-5.17 6.87 0 .59.07 1.17.21 1.72L12.1 67.87c-1.28-1.24-3.03-2.01-4.95-2.01-3.94 0-7.15 3.21-7.15 7.15 0 3.25 2.19 6.01 5.17 6.87v14.2C2.19 94.95 0 97.7 0 100.96c0 3.94 3.21 7.15 7.15 7.15 2.09 0 3.98-.9 5.28-2.35l11.51 6.63c-.14.55-.21 1.12-.21 1.71 0 3.94 3.21 7.14 7.15 7.14 3.94 0 7.15-3.2 7.15-7.14 0-.59-.07-1.17-.21-1.71l11.51-6.63c1.3 1.45 3.19 2.35 5.28 2.35 3.94 0 7.15-3.21 7.15-7.15 0-3.25-2.19-6.01-5.17-6.87v-14.2c2.98-.86 5.17-3.62 5.17-6.87 0-.58-.07-1.14-.19-1.67l2.58-1.48c1.51.71 4.48 1.88 7.86 1.88 2.06 0 4.27-.43 6.4-1.66 6.98-4.03 7.34-13.37 7.35-13.76l.04-1.22-1.08-.6zm-28.12 21c-.55.43-1.24.69-1.99.69-.4 0-.77-.07-1.12-.21-.31-.11-.6-.27-.85-.47-.63-.49-1.07-1.22-1.19-2.05-.02-.15-.04-.3-.04-.46 0-.14.01-.27.03-.4.14-1.17.93-2.15 1.99-2.57.37-.14.76-.22 1.17-.22.44 0 .86.09 1.24.25 1.14.48 1.95 1.62 1.95 2.94 0 .18-.01.35-.04.53-.12.79-.55 1.49-1.15 1.97zm1.21 25.45c0 1.76-1.43 3.19-3.19 3.19-.61 0-1.19-.17-1.67-.47-.91-.56-1.53-1.57-1.53-2.72 0-.04 0-.06.01-.09v-.01c.01-.35.07-.67.19-.98.2-.57.56-1.06 1.03-1.43.4-.32.89-.55 1.42-.63.17-.04.36-.05.55-.05.75 0 1.44.26 1.99.69.72.58 1.2 1.48 1.2 2.5zm-5.17-6.87c-.97.28-1.86.76-2.61 1.4l-12.13-7v-.01c.09-.45.14-.93.14-1.41 0-.69-.1-1.36-.29-1.99l11.94-6.89c.82.78 1.83 1.37 2.95 1.7v14.2zM30.88 117.3c-1.6 0-2.92-1.17-3.16-2.71-.02-.16-.04-.32-.04-.48 0-1.34.83-2.48 1.99-2.96.37-.15.78-.24 1.2-.24.42 0 .83.09 1.2.24 1.17.47 1.99 1.62 1.99 2.96 0 .17-.01.32-.04.48-.22 1.53-1.54 2.71-3.14 2.71zm-7.01-28.8l-12.13 6.99c-.76-.64-1.65-1.12-2.62-1.4v-14.2c1.14-.32 2.15-.93 2.98-1.73l11.92 6.89c-.19.64-.3 1.32-.3 2.02.01.48.06.96.15 1.43zm-13.52 12.46c0 1.15-.61 2.16-1.53 2.72-.48.3-1.06.47-1.67.47-1.76 0-3.19-1.43-3.19-3.19 0-1.01.47-1.92 1.21-2.5.55-.43 1.24-.69 1.99-.69.19 0 .37.01.55.05.53.09 1.01.32 1.42.63.47.37.83.86 1.03 1.43.12.31.18.64.19.99v.09zM3.96 73.01c0-1.76 1.43-3.19 3.19-3.19.41 0 .81.08 1.17.22 1.04.41 1.82 1.36 1.99 2.51.02.15.04.3.04.46 0 .16-.01.31-.04.46-.12.83-.56 1.56-1.19 2.05-.24.19-.5.35-.79.45-.37.15-.76.23-1.18.23-.75 0-1.44-.26-1.99-.69-.73-.58-1.2-1.49-1.2-2.5zM28.9 56.8c.55-.42 1.24-.68 1.98-.68s1.43.26 1.98.68c.63.5 1.06 1.22 1.18 2.04.02.15.04.31.04.47 0 1.01-.47 1.92-1.22 2.5-.24.19-.51.35-.8.45-.37.15-.76.23-1.18.23-.42 0-.81-.08-1.18-.23-.29-.11-.56-.27-.8-.45-.74-.58-1.22-1.49-1.22-2.5 0-.16.01-.32.04-.47.13-.82.56-1.54 1.18-2.04zm5.17 30.39c-.03.97-.5 1.82-1.21 2.38-.14.11-.3.22-.46.3-.45.24-.97.38-1.52.38-.53 0-1.04-.14-1.49-.37-.17-.09-.34-.19-.49-.31-.72-.57-1.19-1.44-1.21-2.42-.01-.03-.01-.06-.01-.09 0-.29.04-.56.12-.83.17-.68.57-1.26 1.1-1.68.35-.27.75-.47 1.19-.58.25-.06.52-.1.79-.1.29 0 .56.04.83.12.42.11.81.31 1.15.57.52.42.91.99 1.09 1.65.08.27.12.56.12.86.01.04.01.08 0 .12zm13.6-15.91c-.14.55-.21 1.13-.21 1.73 0 .61.08 1.2.22 1.77l-12.05 6.94c-.78-.71-1.73-1.24-2.77-1.53V66.17c1.14-.32 2.15-.92 2.98-1.72l11.83 6.83zM18.46 25.14c0-10.51 9.27-18.12 12.43-20.41 3.17 2.28 12.43 9.86 12.43 20.41 0 8.8-6.51 15.17-10.45 18.23V26.74c0-1.09-.89-1.98-1.98-1.98-1.09 0-1.98.89-1.98 1.98v16.63c-3.95-3.04-10.45-9.4-10.45-18.23zm7.46 39.32c.83.8 1.84 1.4 2.98 1.72V80.2c-1.03.3-1.96.81-2.74 1.51L14.1 74.74c.14-.55.21-1.13.21-1.73 0-.6-.07-1.17-.21-1.73l11.82-6.82zm-11.73 37.75c.08-.4.12-.83.12-1.25 0-.76-.12-1.5-.35-2.18L25.72 92c.86.9 1.96 1.58 3.19 1.94v13.3c-1.14.33-2.16.94-2.99 1.74l-11.73-6.77zm21.66 6.77c-.83-.81-1.85-1.41-2.99-1.74v-13.3c1.24-.35 2.34-1.04 3.19-1.94l11.75 6.78c-.22.69-.35 1.42-.35 2.19 0 .42.04.85.12 1.25l-11.72 6.76zm40.58-42.33c-2.63 1.51-5.59 1.24-7.83.64l3.96-2.28c.94-.54 1.27-1.76.73-2.7-.55-.95-1.76-1.27-2.71-.73l-3.94 2.27c.6-2.23 1.85-4.92 4.46-6.43 3.78-2.18 8.43-.8 10.57.05-.32 2.28-1.44 6.99-5.24 9.18z'
              />
              {/* Certificate Icon */}
            </Svg>
            <Svg viewBox='0 0 64 64' width={64}>
              <Path
                fill='#41B883'
                d='M58.3496 4.14453H5.6494C2.5342 4.14453 0 6.67863 0 9.79393V46.3202c0 3.1153 2.5342 5.6494 5.6494 5.6494h18.1133c.5528 0 1-.4472 1-1 0-.5527-.4472-1-1-1H5.6494C3.6368 49.9696 2 48.3329 2 46.3202V9.79393c0-2.0127 1.6368-3.6494 3.6494-3.6494h52.7002c2.0127 0 3.6504 1.6367 3.6504 3.6494V46.3202c0 2.0127-1.6377 3.6494-3.6504 3.6494-.5527 0-1 .4473-1 1 0 .5528.4473 1 1 1 3.1153 0 5.6504-2.5341 5.6504-5.6494V9.79393c0-3.1153-2.5351-5.6494-5.6504-5.6494z'
              />
              <Path
                fill='#41B883'
                d='M22 32.1445H10c-.5527 0-1 .4472-1 1 0 .5527.4473 1 1 1h12c.5528 0 1-.4473 1-1 0-.5528-.4472-1-1-1zM22 38.6943H10c-.5527 0-1 .4472-1 1 0 .5527.4473 1 1 1h12c.5528 0 1-.4473 1-1 0-.5528-.4472-1-1-1zM51.7373 42.0009c-.0184-.063-.0586-.1109-.0876-.1671C53.7256 39.5299 55 36.4897 55 33.1445c0-7.1797-5.8203-13-13-13s-13 5.8203-13 13c0 3.3084 1.2462 6.3187 3.2815 8.6134-.021.0455-.0542.0821-.0686.1317l-4.207 14.4238c-.1104.3789.0117.7861.3115 1.042.2998.2558.7217.3096 1.0772.1416l4.416-2.0977 2.7744 4.0235c.1885.2734.498.4326.8232.4326.0567 0 .1133-.0049.17-.0147.3847-.0664.6953-.3496.7959-.7265l3.4768-12.9773c.0502.0006.0988.0076.1491.0076.0238 0 .0468-.0035.0706-.0036l3.4773 12.9733c.1006.376.4101.6592.7939.7265.0576.0098.1153.0147.1719.0147.3242 0 .6318-.1572.8213-.4287l2.7832-4.0039 4.4111 2.0761c.3545.1661.7754.1104 1.0762-.1455.2988-.2558.4199-.6621.3096-1.04l-4.1778-14.3125zM42 22.1445c6.0655 0 11 4.9345 11 11 0 6.0654-4.9345 11-11 11-6.0654 0-11-4.9346-11-11 0-6.0655 4.9346-11 11-11zm-4.997 34.3613l-2.0293-2.9424c-.2784-.4033-.8067-.5479-1.252-.3359l-3.1719 1.5068 3.3373-11.4416c1.6879 1.3512 3.72 2.282 5.9438 2.6564L37.003 56.5058zm13.2021-3.2529c-.4424-.2051-.9687-.0665-1.2471.3339l-2.0361 2.9297-2.8292-10.5557c2.2247-.361 4.2587-1.2793 5.9529-2.6176l3.3275 11.4009-3.168-1.4912zM23 15.1445c0-1.1046-.8954-2-2-2H11c-1.1045 0-2 .8954-2 2v10c0 1.1045.8955 2 2 2h10c1.1046 0 2-.8955 2-2v-10zm-2 10H11v-10h10v10z'
              />
              <Path
                fill='#41B883'
                d='M42 39.1445c3.3138 0 6-2.6863 6-6 0-3.3138-2.6862-6-6-6-3.3137 0-6 2.6862-6 6 0 3.3137 2.6863 6 6 6zm0-10c2.2057 0 4 1.7943 4 4 0 2.2056-1.7943 4-4 4-2.2056 0-4-1.7944-4-4 0-2.2057 1.7944-4 4-4z'
              />
            </Svg>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{t('certification.title')}</Text>
            <Text>{t('certification.first-text')}</Text>
            <Text style={styles.name}>{studentName}</Text>
            <Text>{t('certification.second-text')}</Text>
            <Text>
              {studentActiveClassName} - {t('certification.course-name')}
            </Text>
          </View>
          <Text style={styles.account}>
            Account Address:{' '}
            <Link style={styles.link} src={`https://explorer.testnet.rsk.co/address/${account}`}>
              {account}
            </Link>
          </Text>

          <Text style={styles.account}>
            Course Address:{' '}
            <Link style={styles.link} src={`https://explorer.testnet.rsk.co/address/${activeClass}`}>
              {activeClass}
            </Link>
          </Text>
        </View>
      </Page>
    </Document>
  )

  const [instance] = usePDF({ document: Doc })

  return instance
}
