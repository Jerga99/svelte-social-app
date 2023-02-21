



export async function load({fetch}){
  const res = await fetch("/api/trends");
  const trends = await res.json();

  return {
    trends
  }
}
