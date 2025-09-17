import { useEffect, useState } from "react";
import { API } from "../../lib/api";
import { Skeleton } from "../ui/Skeleton";

function EmptyState() {
  return (
    <div className="col-span-full text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 mb-4">
        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">No Leadership Data</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto">
        Leadership information will appear here once groups and members are added through the admin panel.
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="col-span-full text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-red-200 mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-700 mb-2">Unable to Load Data</h3>
      <p className="text-sm text-red-600 max-w-md mx-auto">
        There was an issue loading the leadership information. Please refresh the page or try again later.
      </p>
    </div>
  );
}

export default function LeadershipSlot() {
  const [groups, setGroups] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    API("/leadership/")
      .then(setGroups)
      .catch(() => { setError(true); setGroups([]); });
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {groups === null && (
        <>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d315c]/5 via-transparent to-[#ffaf3a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0d315c] to-[#1e4a72] flex items-center justify-center">
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-32 rounded-lg" />
                </div>
                <div className="space-y-4">
                  {[...Array(4)].map((__, j) => (
                    <div key={j} className="rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/50 p-4 border border-slate-200/50">
                      <Skeleton className="h-4 w-3/4 rounded mb-3" />
                      <Skeleton className="h-3 w-1/2 rounded mb-2" />
                      <Skeleton className="h-3 w-2/3 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {groups && groups.length === 0 && (error ? <ErrorState /> : <EmptyState />)}

      {groups && groups.length > 0 && groups.map((g) => (
        <div key={g.id} className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d315c]/5 via-transparent to-[#ffaf3a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Header with icon */}
          <div className="relative p-6 pb-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0d315c] to-[#1e4a72] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0d315c] group-hover:text-[#1e4a72] transition-colors duration-200">
                {g.name}
              </h3>
            </div>
          </div>

          {/* Members list */}
          <div className="relative px-6 pb-6">
            <div className="space-y-4">
              {g.members.map((m, index) => (
                <div 
                  key={m.id} 
                  className="group/member relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/50 p-4 border border-slate-200/50 hover:border-[#0d315c]/20 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Member accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ffaf3a] to-[#009f6f] opacity-0 group-hover/member:opacity-100 transition-opacity duration-200"></div>
                  
                  <div className="pl-3">
                    <div className="font-semibold text-slate-800 group-hover/member:text-[#0d315c] transition-colors duration-200 mb-1">
                      {m.name}
                    </div>
                    {m.title && (
                      <div className="text-sm text-slate-600 group-hover/member:text-slate-700 transition-colors duration-200 mb-1">
                        {m.title}
                      </div>
                    )}
                    {m.qualifications && (
                      <div className="text-xs text-slate-500 group-hover/member:text-slate-600 transition-colors duration-200 leading-relaxed">
                        {m.qualifications}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
