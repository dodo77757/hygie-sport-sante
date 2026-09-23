import { routesFiche } from '@/lib/fiches';

const routes = routesFiche('bilans');

export const dynamicParams = false;
export const generateStaticParams = routes.generateStaticParams;
export const generateMetadata = routes.generateMetadata;
export default routes.Page;
