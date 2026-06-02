#!/bin/bash
# Create catch-all route directory and file

CLIENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CATCHALL_DIR="$CLIENT_DIR/app/[locale]/[...slug]"

mkdir -p "$CATCHALL_DIR"

cat > "$CATCHALL_DIR/page.tsx" << 'EOF'
import { notFound } from "next/navigation";

/**
 * Catch-all route for undefined pages
 * This triggers the not-found.tsx page for any route that doesn't match existing pages
 */
export default function CatchAllRoute() {
  notFound();
}
EOF

echo "✓ Catch-all route created successfully at: $CATCHALL_DIR/page.tsx"
