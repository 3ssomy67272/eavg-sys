"use client";

import { useState, useEffect } from 'react';
import { X, ExternalLink, Plane, Loader2, AlertCircle } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface Route {
  flightNumber: string;
  departureICAO: string;
  arrivalICAO: string;
  aircraft: string;
}

interface Codeshare {
  id: string;
  name: string;
  logo: string;
  active: boolean;
  forumLink?: string;
  tableName: string; // The specific Airtable table name for this partner's routes
}

export default function CodesharesPage() {
  const [selectedCodeshare, setSelectedCodeshare] = useState<Codeshare | null>(null);
  const [codeshares, setCodeshares] = useState<Codeshare[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRoutesLoading, setIsRoutesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch partners list on mount
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
        const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
        const MASTER_TABLE_NAME = 'Partners'; 

        if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
          console.warn('Airtable credentials missing. Using fallback data.');
          throw new Error('MISSING_CREDENTIALS');
        }

        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(MASTER_TABLE_NAME)}`,
          {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          }
        );

        if (!response.ok) throw new Error(`API_ERROR: ${response.status}`);

        const data = await response.json();
        const mapped: Codeshare[] = data.records.map((record: any) => {
          // Support for Airtable Attachment field or simple string/emoji
          let logoUrl = '✈️';
          if (record.fields.Logo) {
            if (Array.isArray(record.fields.Logo) && record.fields.Logo.length > 0) {
              logoUrl = record.fields.Logo[0].url || record.fields.Logo[0].thumbnails?.large?.url || '✈️';
            } else if (typeof record.fields.Logo === 'string') {
              logoUrl = record.fields.Logo;
            }
          }

          return {
            id: record.id,
            name: record.fields.Name || 'Unknown Partner',
            logo: logoUrl,
            active: record.fields.Status === 'Active',
            forumLink: record.fields.ForumLink,
            tableName: record.fields.TableName || record.fields.Name,
          };
        });

        setCodeshares(mapped);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching partners:', err);
        
        if (err.message === 'MISSING_CREDENTIALS') {
          setError('Airtable API Key or Base ID is not configured in .env.local');
        } else {
          setError(`Failed to connect to Airtable: ${err.message}`);
        }

        // Keep fallback data so the page doesn't look empty during setup
        setCodeshares([
          { id: '1', name: 'Emirates Virtual', logo: '🇦🇪', active: true, forumLink: 'https://forum.example.com/emirates', tableName: 'EmiratesRoutes' },
          { id: '2', name: 'Lufthansa Virtual', logo: '🇩🇪', active: true, forumLink: 'https://forum.example.com/lufthansa', tableName: 'LufthansaRoutes' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Fetch routes when a codeshare is selected
  useEffect(() => {
    const fetchRoutes = async () => {
      if (!selectedCodeshare) {
        setRoutes([]);
        return;
      }

      try {
        setIsRoutesLoading(true);
        const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
        const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;

        if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) return;

        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(selectedCodeshare.tableName)}`,
          {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          }
        );

        if (!response.ok) throw new Error(`Failed to fetch routes from ${selectedCodeshare.tableName}`);

        const data = await response.json();
        const mappedRoutes: Route[] = data.records.map((record: any) => {
          // Handle Aircraft field which can be a single string or multiple selection (array)
          const aircraftField = record.fields['Aircraft'];
          const aircraft = Array.isArray(aircraftField) 
            ? aircraftField.join(', ') 
            : (aircraftField || 'TBA');

          return {
            flightNumber: record.fields['flightNumber'] || 'N/A',
            departureICAO: record.fields['Departure_ICAO'] || '----',
            arrivalICAO: record.fields['Arrival_ICAO'] || '----',
            aircraft: aircraft,
          };
        });

        setRoutes(mappedRoutes);
      } catch (err: any) {
        console.error('Error fetching routes:', err);
        // Fallback routes for development
        setRoutes([
          { flightNumber: 'CS101', departureICAO: 'HECA', arrivalICAO: 'OMDB', aircraft: 'B77W' },
          { flightNumber: 'CS102', departureICAO: 'OMDB', arrivalICAO: 'HECA', aircraft: 'B77W' }
        ]);
      } finally {
        setIsRoutesLoading(false);
      }
    };

    fetchRoutes();
  }, [selectedCodeshare]);

  const activeCodeshares = codeshares.filter(cs => cs.active);
  const inactiveCodeshares = codeshares.filter(cs => !cs.active);

  const renderLogo = (logo: string, className: string = "text-6xl") => {
    const isUrl = logo.startsWith('http') || logo.startsWith('/') || logo.startsWith('data:');
    
    if (isUrl) {
      // Determine size based on className if possible, or use defaults
      const isSmall = className.includes('text-5xl');
      const sizeClasses = isSmall ? 'w-16 h-16' : 'w-32 h-32';

      return (
        <div className={`flex items-center justify-center ${sizeClasses} overflow-hidden rounded-lg bg-gray-50/50`}>
          <img 
            src={logo} 
            alt="Partner Logo" 
            className="w-full h-full object-contain pointer-events-none select-none p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.innerHTML = '✈️';
                target.parentElement.className = `${className} flex items-center justify-center`;
              }
            }}
          />
        </div>
      );
    }
    
    return <div className={className}>{logo}</div>;
  };

  // Helper to extract ICAO from "Name ( ICAO )" format
  const getCleanICAO = (icaoStr: string) => {
    const match = icaoStr.match(/\((.*?)\)/);
    return match ? match[1].trim() : icaoStr;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#042C64] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Codeshare Partners</h1>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <p className="max-w-2xl mx-auto text-lg">
              EgyptAir Virtual Group has established partnerships with premier virtual airlines offering expanded route options and collaborative opportunities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Active Partnerships */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <h2 className="mb-12 text-[#042C64] font-bold">Active Partnerships</h2>
          </ScrollReveal>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-[#042C64] animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading codeshare partners...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md flex items-start gap-4 mb-12">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-800 font-bold mb-1">Notice: Using Local Data</h3>
                <p className="text-red-700 text-sm">
                  {error}. Displaying fallback partnership data.
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {!isLoading && activeCodeshares.map((codeshare, index) => (
              <ScrollReveal key={codeshare.id} animation="slide-up" delay={index * 100}>
                <div
                  onClick={() => setSelectedCodeshare(codeshare)}
                  className="bg-white border-2 border-[#042C64] rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-all hover:scale-105 h-full flex flex-col items-center justify-center min-h-[200px]"
                >
                  <div className="mb-4">
                    {renderLogo(codeshare.logo)}
                  </div>
                  <h3 className="text-[#042C64] font-bold">{codeshare.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm">Click for details</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Inactive/Coming Soon */}
      {!isLoading && inactiveCodeshares.length > 0 && (
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="slide-up">
              <h2 className="mb-12 text-[#042C64] font-bold">Coming Soon</h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {inactiveCodeshares.map((codeshare, index) => (
                <ScrollReveal key={codeshare.id} animation="slide-up" delay={index * 100}>
                  <div
                    className="bg-white border border-gray-300 rounded-lg p-6 text-center opacity-50 cursor-not-allowed h-full flex flex-col items-center justify-center min-h-[200px]"
                  >
                    <div className="mb-4 grayscale">
                      {renderLogo(codeshare.logo)}
                    </div>
                    <h3 className="text-gray-600 font-bold">{codeshare.name}</h3>
                    <p className="text-gray-400 mt-2 text-sm">Coming Soon</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal */}
      {selectedCodeshare && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                {renderLogo(selectedCodeshare.logo, "text-5xl")}
                <h2 className="text-[#042C64] font-bold">{selectedCodeshare.name}</h2>
              </div>
              <button
                onClick={() => setSelectedCodeshare(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              {selectedCodeshare.forumLink && (
                <div className="mb-8">
                  <a
                    href={selectedCodeshare.forumLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#042C64] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:scale-105"
                  >
                    Visit Partner Forum
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {isRoutesLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-10 h-10 text-[#042C64] animate-spin mb-3" />
                  <p className="text-gray-500 text-sm">Fetching shared routes...</p>
                </div>
              ) : routes.length > 0 ? (
                <div>
                  <h3 className="mb-6 text-[#042C64] font-bold flex items-center gap-2">
                    <Plane className="w-5 h-5" />
                    Shared Routes
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {routes.map((route, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#042C64]/30 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#042C64]/10 rounded-full flex items-center justify-center group-hover:bg-[#042C64] transition-colors">
                            <Plane className="w-5 h-5 text-[#042C64] group-hover:text-white transition-colors" />
                          </div>
                          <div>
                            <span className="text-gray-900 font-bold block">
                              {route.flightNumber} — {route.departureICAO} to {route.arrivalICAO}
                            </span>
                            <span className="text-gray-500 text-sm">
                              Aircraft: <span className="font-semibold text-gray-700">{route.aircraft}</span>
                            </span>
                          </div>
                        </div>
                        <div className="hidden sm:block text-[#042C64]/20 group-hover:text-[#042C64]/40 transition-colors font-mono text-xs font-bold">
                          {route.flightNumber} - {getCleanICAO(route.departureICAO)} - {getCleanICAO(route.arrivalICAO)} - {route.aircraft}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-blue-800 text-sm leading-relaxed">
                      These routes are available for codeshare operations. Fly them under the 
                      <strong> EAVG callsign</strong> to earn credits
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">No shared routes currently listed for this partner.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
