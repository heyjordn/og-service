import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'edge',
};

// Make sure the font exists in the specified path:
const font = fetch(new URL('../../assets/CamptonBold.otf', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );
 
export default async function handler(request) {
    const fontData = await font;
  try {
    const { searchParams } = new URL(request.url);
 
    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const hasPath= searchParams.has('path');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Hey There 👋';
    const path = hasPath ? searchParams.get('path') : 'heyjordn.com'
 
    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'white',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              alt="HeyJordn"
              height={200}
              src="data:image/svg+xml,%3Csvg width='512' height='512' viewBox='0 0 512 514' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M178.425 0.000618151L178.425 96.9703H96.9721V178.425H0.00244141V96.9703H0.000595093V0.000610352L178.425 0.000618151Z' fill='%231C41FF'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M511.999 2.12769e-06V0.923103H512L512 266.798H511.729C506.98 404.008 394.252 513.783 255.885 513.783C117.095 513.783 4.10145 403.337 0 265.541H96.9635C101.009 349.768 170.579 416.814 255.808 416.814C341.037 416.814 410.607 349.768 414.652 265.541H414.965V96.9697H333.575V0L511.999 2.12769e-06Z' fill='%231B1D30'/%3E%3C/svg%3E%0A"
              style={{ margin: '0 30px' }}
              width={200}
            />
          </div>
          <div
            style={{
              fontSize: 60,
              fontFamily: 'Campton',
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: 'black',
              marginTop: 40,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              fontStyle: 'bold',
              color: 'black',
              marginTop: 50,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {path}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: 'twemoji',
        fonts: [
            {
              name: 'Campton',
              data: fontData,
              style: 'normal',
            },
          ],
      },
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}