import crustyImg from './crusty-screenshot.png'
const { HOSTNAME } = process.env

export const metadata = {
  image: `${HOSTNAME}${crustyImg.src}`,
  external_url: `${HOSTNAME}/tokens/0`,
  name: 'Crusty',
  description: 'Dry in the wettest places',
  animation_url: `${HOSTNAME}/tokens/0`,
  background_color: '#000000'
}

export default function Metadata () { }

export const getServerSideProps = async context => {
  context.res.setHeader('Content-Type', 'application/json; charset=utf-8');
  context.res.write(JSON.stringify(metadata));
  context.res.end();
  return { props: { } };
}