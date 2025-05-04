import { GetStaticPaths, GetStaticProps, NextPage } from 'next'; // Added NextPage type
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient'; // Adjust path if lib is elsewhere

// Define basic interfaces for props (improves TypeScript safety)
interface Review {
  reviewer_name: string | null;
  text: string | null;
  stars: number;
  published_at_date: string | null;
  review_id: string; // Assuming review_id exists for keys
}

// Define Company interface matching expected props from getStaticProps
interface Company {
  name: string;
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
  // slug?: string | null; // Slug is NOT selected in getStaticProps for now
  site_company_insights_description?: string | null;
  // Add any other fields you ARE selecting below
}


interface PageProps {
  company: Company | null; // Allow company to be potentially null if notFound: true
  reviews: Review[];
  logoUrl: string | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("Fetching biz_ids for getStaticPaths...");
  const { data, error } = await supabase
    .from('companies')
    .select('biz_id::text') // Select biz_id as text
    .not('biz_id', 'is', null)
    // .limit(10); // REMEMBER TO LIMIT DURING DEVELOPMENT FOR FASTER BUILDS! Remove for full build.

  if (error) {
    console.error('Error fetching biz_ids:', error);
    return { paths: [], fallback: 'blocking' };
  }
  if (!data) {
    console.log("No biz_ids found.");
    return { paths: [], fallback: 'blocking' };
  }

  const paths = data.map((company) => ({
    params: { biz_id: company.biz_id },
  }));
  console.log(`Found ${paths.length} paths to generate (biz_ids).`);

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<PageProps, { biz_id: string }> = async ({ params }) => {
  const biz_id = params?.biz_id as string; // Cast to string
  console.log(`Workspaceing data for biz_id: ${biz_id}`);

  if (!biz_id) {
       console.error('Invalid/missing biz_id parameter');
       return { notFound: true };
  }

  // Fetch company data using biz_id - SLUG IS REMOVED FROM SELECT
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select(`
      name, phone, city, state, full_address, latitude, longitude,
      rating, reviews, working_hours, logo, logo_override, facebook,
      instagram, reviews_link, site_company_insights_founded_year,
      primary_color, secondary_color, place_id, biz_id,
      site_company_insights_description
    `) // SLUG REMOVED HERE
    .eq('biz_id', biz_id)
    .single();

  if (companyError || !company) {
    console.error(`Error fetching company data for biz_id ${biz_id}:`, companyError);
    // console.error('Full error object:', JSON.stringify(companyError, null, 2)); // More detailed error log if needed
    return { notFound: true };
  }
  console.log(`Found company: ${company.name}`);

  // Fetch reviews (using biz_id or place_id)
  let reviewsData: Review[] = [];
  const link_id_for_reviews = company.biz_id ?? company.place_id;
  const link_column_for_reviews = company.biz_id ? 'biz_id' : 'place_id';

  if (link_id_for_reviews) {
    const { data: reviews, error: reviewsError } = await supabase
      .from('company_reviews')
      .select('reviewer_name, text, stars, published_at_date, review_id') // Added review_id
      .eq(link_column_for_reviews, link_id_for_reviews)
      .eq('stars', 5)
      .order('published_at_date', { ascending: false })
      .limit(5);

    if (reviewsError) console.error('Error fetching reviews:', reviewsError);
    else {
        reviewsData = reviews || [];
        console.log(`Found ${reviewsData.length} reviews linked by ${link_column_for_reviews}.`);
    }
  } else {
    console.log(`No reliable ID (biz_id or place_id) for ${company.name}, skipping review fetch.`);
  }

  // Determine Logo URL
  const logoUrl = (company.logo_override === 'Yes' && company.logo) ? company.logo : null;

  return {
    props: {
      company: company as Company, // Cast type for safety
      reviews: reviewsData,
      logoUrl: logoUrl,
    },
    // revalidate: 60 * 60 * 24, // Optional: Revalidate daily
  };
};

// --- Page Component ---
const CompanyPage: NextPage<PageProps> = ({ company, reviews, logoUrl }) => {
  if (!company) {
    return <div>Loading... or Company Not Found</div>;
  }

  const featuredImageUrl = logoUrl ?? '/default-og-image.png'; // Define a fallback image path in /public

  return (
    <>
      <Head>
        <title>{company.name} | HVAC in {company.city ?? 'Your Area'}</title>
        <meta name="description" content={`Details for ${company.name} in ${company.city ?? 'area'}`} />
        <meta property="og:title" content={`${company.name} | ${company.city ?? ''}`} />
        <meta property="og:image" content={featuredImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${company.name} | ${company.city ?? ''}`} />
        <meta name="twitter:image" content={featuredImageUrl} />
        {/* Add other meta tags as needed */}
      </Head>

      {/* --- Basic Structure - Replace with Actual Components --- */}
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
        <p>City: {company.city ?? 'N/A'}</p>
        <p>State: {company.state ?? 'N/A'}</p>
        <p>Phone: {company.phone ?? 'N/A'}</p>
        <p>
          Rating: {company.rating ?? 'N/A'} ({company.reviews ?? 0} reviews)
        </p>
        <p>Logo URL used: {logoUrl ?? 'None (Using Text or Placeholder)'}</p>
        <p>Biz ID for this page: {company.biz_id}</p>
        {/* Basic Review Display */}
        {reviews && reviews.length >= 3 && ( // Only show if 3 or more 5-star reviews fetched
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">
              Recent 5-Star Reviews
            </h2>
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li
                  key={review.review_id ?? Math.random()} // Use unique key
                  className="border p-3 rounded shadow-sm"
                >
                  <p>
                    <strong>{review.reviewer_name ?? "Reviewer"}</strong>
                  </p>
                  <p className="my-2">"{review.text ?? "-"}"</p>
                  {review.published_at_date && (
                    <p className="text-sm text-gray-600">
                      (
                      {new Date(
                        review.published_at_date
                      ).toLocaleDateString()}
                      )
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {(!reviews || reviews.length < 3) && (
          <p className="mt-6">See our reviews on Google!</p>
        )}{" "}
        {/* Fallback text */}
      </main>
       {/* --- End of basic structure --- */}
    </>
  );
};

export default CompanyPage;
