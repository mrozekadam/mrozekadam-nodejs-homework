import type { FC } from 'hono/jsx';
import Layout from './Layout';

type Props = {
    title?: string;
};

const IndexView: FC<Props> = ({ title }) => (
    <Layout title={title}>
        <p>HELLO WORLD!</p>
    </Layout>
);

export default IndexView;
