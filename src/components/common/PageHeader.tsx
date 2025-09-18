"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const pathname = usePathname();

  // pisah path jadi array (hapus yang kosong)
  const segments = pathname.split("/").filter(Boolean);

  // bikin breadcrumb items
  const breadcrumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const isLast = idx === segments.length - 1;

    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1), // Kapital huruf pertama
      href: isLast ? undefined : href,
    };
  });

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-base">{subtitle}</p>
        )}
      </div>

      {/* Breadcrumb */}
      <nav className="text-muted-foreground text-base">
        <ol className="flex items-center gap-2">
          {breadcrumbs.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold">
                  {item.label}
                </span>
              )}
              {idx < breadcrumbs.length - 1 && <span>/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
