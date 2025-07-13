import AdminTable from "@/components/common/AdminTable";

export default function Specs() {
  const fields: Array<{ name: string; label: string; type: "text" | "number" | "textarea" | "date" }> = [
    { name: "name", label: "Name", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "location", label: "Location", type: "text" },
    { name: "year", label: "Year", type: "number" },
  ];

  return (
    <AdminTable
      title="Museum Collections"
      apiEndpoint="/api/specs"
      columns={["Name", "Description", "Location", "Year"]}
      fields={fields}
      searchFields={["name", "description", "location"]}
    />
  );
}
