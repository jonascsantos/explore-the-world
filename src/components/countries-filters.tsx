'use client';

import { useSearchQuery, useSelectedRegion, useSortBy, useSortOrder, useRegions, useCountriesActions } from '@/hooks/use-countries-store';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CountriesFilters() {
  const searchQuery = useSearchQuery();
  const selectedRegion = useSelectedRegion();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();
  const regions = useRegions();
  const { setSearchQuery, setSelectedRegion, setSortBy, setSortOrder, clearFilters } = useCountriesActions();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filter Countries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search Countries
            </label>
            <Input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Filter by Region</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger suppressHydrationWarning>
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'name' | 'region' | 'population')}>
              <SelectTrigger suppressHydrationWarning>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="region">Region</SelectItem>
                <SelectItem value="population">Population</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sort Order</label>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}>
              <SelectTrigger suppressHydrationWarning>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="text-sm"
          >
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}