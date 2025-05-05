// pages/[slug].tsx

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient'; // Ensure path is correct
import Layout from '../components/shared/Layout'; // Import the Layout
// Import ALL section components
import Hero from '../components/templates/TemplateHVAC1/Hero';
import About from '../components/templates/TemplateHVAC1/About';
import Services from '../components/templates/TemplateHVAC1/Services';
import ReviewsSection from '../components/templates/TemplateHVAC1/ReviewsSection';
import LocationMap from '../components/templates/TemplateHVAC1/LocationMap';

// --- INTERFACES ---
export interface Review {
  name: string | null;
  text: string | null;
  stars: number;
  published_at_date: string | null;
  review_id: string;
}

export interface Company {
  name: string;
  slug?: string | null;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  full_address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  rating?: number | null;
  reviews?: number | null; // Count
  working_hours?: string | null;
  logo?: string | null;
  logo_override?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  reviews_link?: string | null;
  site_company_insights_founded_year?: number | null;
  primary_color?: string | null;
  secondary_color?: string | null;
  place_id?: string | null;
  biz_id?: string | number | null;
  site_company_insights_description?: string | null;
}

interface PageProps {
  company: Company | null;
  reviews: Review[];
  logoUrl: string | null;
}

// --- DATA FETCHING ---
export const getStaticPaths: GetStaticPaths = async () => {
  console.log('Fetching slugs for getStaticPaths...');
  const { data, error } = await supabase
    .from('companies')
    .select('slug') // Select slug
    .not('slug', 'is', null); // Ensure slug exists
  // .limit(10); // Limit during dev

  if (error) {
    console.error('Error fetching slugs:', error);
    return { paths: [], fallback: 'blocking' };
  }
  if (!data) {
    console.log('No slugs found.');
    return { paths: [], fallback: 'blocking' };
  }

  // Map SLUGS to paths
  const paths = data.map((company) => ({
    params: { slug: company.slug }, // Use slug here
  }));
  console.log(`Found ${paths.length} paths to generate (slugs).`);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<PageProps, { slug: string }> = async ({ params }) => {
  // Param is now slug
  const slug = params?.slug as string; // Get slug
  console.log(`Workspaceing data for slug: ${slug}`);

  if (!slug) {
    console.error('Invalid/missing slug parameter');
    return { notFound: true };
  }

  // Fetch company data using slug
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select(
      `
      name, slug, phone, city, state, full_address, latitude, longitude,
      rating, reviews, working_hours, logo, logo_override, facebook,
      instagram, reviews_link, site_company_insights_founded_year,
      primary_color, secondary_color, place_id, biz_id,
      site_company_insights_description
    `,
    )
    .eq('slug', slug) // Query by slug
    .single();

  if (companyError || !company) {
    console.error(`Error fetching company data for slug ${slug}:`, companyError);
    return { notFound: true };
  }
  console.log(`Found company: ${company.name}`);

  // Fetch reviews (using place_id or biz_id from the fetched company data)
  let reviewsData: Review[] = [];
  const link_id_for_reviews = company.biz_id ?? company.place_id; // Use the appropriate ID from company data
  const link_column_for_reviews = company.biz_id ? 'biz_id' : 'place_id';

  if (link_id_for_reviews) {
    // ... same review fetching logic using link_column_for_reviews ...
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('name, text, stars, published_at_date, review_id')
      .eq(link_column_for_reviews, link_id_for_reviews)
      .eq('stars', 5)
      .order('published_at_date', { ascending: false })
      .limit(5);
    if (!reviewsError) {
      reviewsData = reviews || [];
      console.log(`Found ${reviewsData.length} reviews linked by ${link_column_for_reviews}.`);
    } else {
      console.error('Error fetching reviews:', reviewsError);
    }
  } else {
    console.log(`No reliable ID for ${company.name}, skipping review fetch.`);
  }

  // Determine Logo URL
  const logoUrl = company.logo_override === 'Yes' && company.logo ? company.logo : null;

  return {
    props: {
      company: company as Company,
      reviews: reviewsData,
      logoUrl: logoUrl,
    },
    revalidate: 3600, // Example: Revalidate every hour
  };
};

// --- PAGE COMPONENT ---
const CompanyPage: NextPage<PageProps> = ({ company, reviews, logoUrl }) => {
  if (!company) {
    return <div>Loading... or Company Not Found</div>;
  }

  const featuredImageUrl = logoUrl ?? '/default-og-image.png';

  return (
    <Layout company={company} logoUrl={logoUrl}>
      <Head>
        <title>{`${company.name} | HVAC in ${company.city ?? 'Your Area'}`}</title>
        <meta
          name="description"
          content={`Contact ${company.name} for reliable HVAC services in ${company.city ?? ''}. ${
            company.site_company_insights_description?.substring(0, 120) ?? ''
          }`}
        />
        <meta property="og:title" content={`${company.name} | ${company.city ?? ''}`} />
        <meta property="og:description" content={`Contact ${company.name} for HVAC...`} />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:url" content={`https://your-deployed-domain.com/${company.slug}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${company.name} | ${company.city ?? ''}`} />
        <meta name="twitter:description" content={`Contact ${company.name} for HVAC...`} />
        <meta name="twitter:image" content={featuredImageUrl} />
      </Head>
      {/* Render all the section components in order */}
      <Hero company={company} />
      <About company={company} />
      <Services company={company} />
      <ReviewsSection reviews={reviews} company={company} />
      <LocationMap company={company} />
      {/* Chat Widget Placeholder - position fixed */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 z-50">
        {/* Replace with actual chat icon later */}
        <span>Chat</span>
      </div>
    </Layout>
  );
};

export default CompanyPage;
