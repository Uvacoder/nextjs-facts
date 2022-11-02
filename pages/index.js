import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import FactItem from '../components/FactItem/FactItem';

export default function Home({ facts }) {
  const [factsList, setFacts] = useState(facts);
  const [parent] = useAutoAnimate();

  const handleRefresh = async () => {
    const facts = await fetch('/api/facts');
    setFacts(facts);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <main>
        <div className='mx-auto d-flex max-w-full md:max-w-screen-sm overflow-x-hidden p-3 bg-yellow-50 min-h-screen'>
          <div className=' mb-3'>
            <h1>Fact(ory)s</h1>
            <hr />
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
