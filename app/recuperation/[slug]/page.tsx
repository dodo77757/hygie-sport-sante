import { routesFiche } from '@/lib/fiches';

const routes = routesFiche('recuperation');

export const dynamicParams = false;
export const generateStaticParams = routes.generateStaticParams;
export const generateMetadata = routes.generateMetadata;
export default routes.Page;
