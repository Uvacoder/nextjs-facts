import { useAutoAnimate } from '@formkit/auto-animate/react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useState } from 'react';
import FactItem from '../components/FactItem/FactItem';

export default function Home({ facts }) {
  const [factsList, setFacts] = useState(facts);
  const [parent] = useAutoAnimate();

  const handleRefresh = async () => {
    const facts = await fetch('/api/facts');
    const factsJson = await facts.json();
    console.log(factsJson);
    setFacts(factsJson.facts);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <main>
        <div className='mx-auto d-flex max-w-full md:max-w-screen-sm overflow-x-hidden p-3 bg-yellow-50 min-h-screen'>
          <div className='d-flex mb-3 justify-between'>
            <h1 className='mb-2'>Fact(ory)s</h1>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleRefresh}
            >
              Get more facts
            </button>
          </div>

          <div>
            {
              <ul ref={parent}>
                {factsList.map((item) => (
                  <FactItem key={item.fact} fact={item.fact} />
                ))}
              </ul>
            }
          </div>
        </div>
      </main>
      </PullToRefresh>
  );
}

export const getStaticProps = async () => {
  const response = await fetch('https://api.api-ninjas.com/v1/facts?limit=10', {
    method: 'GET',
    headers: { 'X-Api-Key': process.env.FACTS_API_KEY },
    contentType: 'application/json',
  });
  const responseJson = await response.json();
  return {
    props: {
      facts: responseJson,
    },
  };
};
