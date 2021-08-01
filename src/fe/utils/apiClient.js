import fetch from 'node-fetch';

export const ROOT = 'https://hn.algolia.com';

export const get = async (url, append) => {
  try {
    const finalUrl = append === false ? url : `${ROOT}${url}`;
    const res = await fetch(finalUrl,
      // {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      // }
    );
    const resFinal = await res.json();
    return resFinal;
  } catch(e) {
    throw new Error('Failed');
  }
}
