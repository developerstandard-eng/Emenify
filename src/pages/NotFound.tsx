import { Button, Eyebrow } from '@/components/ui'
import { pageMeta } from '@/data/site'
import { useDocumentTitle } from '@/lib/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle(pageMeta.notFound)
  return (
    <section className="section bg-mist">
      <div className="container-site max-w-[44rem] py-10">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="h1">We could not find that page</h1>
        <p className="lead mt-6">The link may be out of date, or the page has moved. Try the home page or one of our services.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/services" variant="secondary">
            View services
          </Button>
        </div>
      </div>
    </section>
  )
}
