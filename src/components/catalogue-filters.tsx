import { areas } from "@/data/site"

type Params = Record<string, string | string[] | undefined>

function value(params: Params, key: string) {
  const current = params[key]
  return Array.isArray(current) ? current[0] || "" : current || ""
}

export function CatalogueFilters({ params, transaction }: { params: Params; transaction: "sale" | "rent" }) {
  const sale = transaction === "sale"

  return (
    <form className="catalogue-filters">
      <label>
        <span>Location</span>
        <select name="area" defaultValue={value(params, "area")}>
          <option value="">All locations</option>
          {areas.map((area) => <option value={area.slug} key={area.slug}>{area.name}</option>)}
          <option value="estepona">New Golden Mile</option>
        </select>
      </label>
      <label>
        <span>Property type</span>
        <select name="type" defaultValue={value(params, "type")}>
          <option value="">All types</option>
          <option value="villa">Villa</option>
          <option value="apartment">Apartment</option>
          <option value="penthouse">Penthouse</option>
          <option value="townhouse">Townhouse</option>
          <option value="finca">Finca</option>
        </select>
      </label>
      <label>
        <span>Bedrooms</span>
        <select name="beds" defaultValue={value(params, "beds")}>
          <option value="">Any</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </label>
      <label>
        <span>Maximum {sale ? "price" : "monthly rent"}</span>
        <select name="max" defaultValue={value(params, "max")}>
          <option value="">No maximum</option>
          {sale ? <>
            <option value="1000000">€1 million</option>
            <option value="2000000">€2 million</option>
            <option value="4000000">€4 million</option>
            <option value="6000000">€6 million</option>
          </> : <>
            <option value="5000">€5,000 / month</option>
            <option value="10000">€10,000 / month</option>
            <option value="15000">€15,000 / month</option>
          </>}
        </select>
      </label>
      <button className="button filter-button" type="submit">Refine search</button>
    </form>
  )
}
