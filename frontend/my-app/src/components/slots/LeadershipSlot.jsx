import { useEffect, useState } from "react";
import { API } from "../../lib/api";
import { Skeleton } from "../ui/Skeleton";

function EmptyState() {
  return <div className="col-span-full text-center text-sm text-gray-500">
    No leadership data yet. Add groups & members in Admin.
  </div>;
}
function ErrorState() {
  return <div className="col-span-full text-center text-sm text-red-600">
    Couldn’t load leadership data. Please try again.
  </div>;
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
    <div className="grid md:grid-cols-3 gap-6">
      {groups === null && (
        <>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border shadow-sm p-4">
              <Skeleton className="h-5 w-1/2 rounded mb-4" />
              {[...Array(4)].map((__, j) => (
                <div key={j} className="rounded-lg bg-rose-50 p-3 mb-3 last:mb-0">
                  <Skeleton className="h-4 w-2/3 rounded mb-2" />
                  <Skeleton className="h-3 w-1/2 rounded mb-1" />
                  <Skeleton className="h-3 w-1/3 rounded" />
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {groups && groups.length === 0 && (error ? <ErrorState /> : <EmptyState />)}

      {groups && groups.length > 0 && groups.map((g) => (
        <div key={g.id} className="rounded-2xl border shadow-sm p-4">
          <h3 className="font-semibold text-[#0d315c] mb-3">{g.name}</h3>
          <ul className="space-y-3">
            {g.members.map((m) => (
              <li key={m.id} className="rounded-lg bg-rose-50 p-3">
                <div className="font-medium">{m.name}</div>
                {m.title && <div className="text-sm text-gray-600">{m.title}</div>}
                {m.qualifications && <div className="text-xs text-gray-500">{m.qualifications}</div>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
