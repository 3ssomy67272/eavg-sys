"use client";


import { useState, useEffect } from "react";
import { Search, Plane } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function RoutesPage() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Fetch EgyptAir routes from Airtable
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
        const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
        const TABLE_NAME = 'EgyptAir';

        if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
          console.warn('Airtable credentials missing for Routes page.');
          setLoading(false);
          return;
        }

        // Add sorting by FlightNumber to the URL
        const sortParams = encodeURIComponent('sort[0][field]') + '=FlightNumber&' + encodeURIComponent('sort[0][direction]') + '=asc';
        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}?${sortParams}`,
          {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          }
        );

        if (!response.ok) throw new Error(`API_ERROR: ${response.status}`);

        const data = await response.json();
        
        const mappedRoutes = data.records.map((record: any) => {
          const fields = record.fields;
          
          // Helper to split "City ( ICAO )"
          const parseLocation = (str: string) => {
            if (!str) return { city: 'Unknown', icao: '----' };
            const match = str.match(/^(.*?)\s*\(\s*(.*?)\s*\)$/);
            if (match) {
              return { city: match[1].trim(), icao: match[2].trim() };
            }
            return { city: str.trim(), icao: str.trim() };
          };

          const origin = parseLocation(fields['Departure_ICAO']);
          const destination = parseLocation(fields['Arrival_ICAO']);
          
          // Handle Aircraft field (could be array or string)
          const aircraftField = fields['Aircraft'];
          const aircraft = Array.isArray(aircraftField) 
            ? aircraftField.join(', ') 
            : (aircraftField || 'TBA');

          return {
            id: record.id,
            flightNumber: fields['FlightNumber'] || 'N/A',
            originCity: origin.city,
            originICAO: origin.icao,
            destinationCity: destination.city,
            destinationICAO: destination.icao,
            aircraft: aircraft,
            duration: fields['Duration'] || '--:--',
            distance: fields['Distance (NM)'] || '0 NM',
          };
        });

        setRoutes(mappedRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredRoutes = routes.filter(
    (route) =>
      route.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.originICAO.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.originCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destinationICAO.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destinationCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.aircraft.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredRoutes.length / pageSize);
  const paginatedRoutes = filteredRoutes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Route Network</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg">
              Explore our comprehensive route network covering
              EgyptAir's destinations worldwide. All routes are
              based on real-world schedules.
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* Routes Table */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <ScrollReveal animation="slide-up">
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search routes, airports, or aircraft..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#042C64] transition-shadow focus:shadow-md"
                />
              </div>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#042C64]"></div>
              <p className="mt-4 text-gray-600 font-medium">
                Loading routes...
              </p>
            </div>
          ) : (
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-[#042C64] text-white">
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                        Flight Number
                      </th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                        Origin ICAO
                      </th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                        Origin City
                      </th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                        Destination ICAO
                      </th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                        Destination City
                      </th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                        Aircraft
                      </th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs">
                        Distances
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRoutes.map((route, index) => (
                      <tr
                        key={route.id}
                        className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50/50"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Plane className="w-4 h-4 text-[#042C64]" />
                            <span className="font-bold text-[#042C64]">{route.flightNumber}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {route.originICAO}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm font-medium">
                          {route.originCity}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {route.destinationICAO}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm font-medium">
                          {route.destinationCity}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {route.aircraft}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                          {route.duration}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                          {route.distance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredRoutes.length === 0 && (
                  <div className="text-center py-20 text-gray-500 bg-white">
                    <Plane className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-lg font-medium">No routes found matching your search.</p>
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </ScrollReveal>
          )}

          <ScrollReveal animation="fade-in" delay={400}>
            <div className="mt-8 text-center text-gray-500 font-medium text-sm">
              <p>
                Showing {paginatedRoutes.length} of {filteredRoutes.length}{" "}
                filtered routes (Total: {routes.length})
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}