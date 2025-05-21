import { getConnection } from '../connection';
import { getTableRef, buildSampleClause } from './utils';
import type { AspectAnalysis } from '../types';
import type { DataLimit } from '../../../components/onboarding/DataSelectionStep';

export async function fetchAspectAnalysis(
  database: string,
  tableName: string,
  limit: DataLimit
): Promise<AspectAnalysis[]> {
  const connection = await getConnection();
  const tableRef = getTableRef(database, tableName);
  const sampleClause = buildSampleClause(tableRef, limit);

  const query = `
    ${sampleClause},
    rating_aspects AS (
      SELECT 
        CASE 
          WHEN label = 5 THEN 'Excellent'
          WHEN label = 4 THEN 'Good'
          WHEN label = 3 THEN 'Average'
          WHEN label = 2 THEN 'Poor'
          ELSE 'Very Poor'
        END as aspect,
        label
      FROM sample_data
    )
    SELECT 
      aspect,
      AVG(label) as avg_rating,
      COUNT(*) as mention_count
    FROM rating_aspects
    GROUP BY aspect
    ORDER BY avg_rating DESC
  `;

  const result = await connection.evaluateQuery(query);
  return result.data.toRows().map(row => ({
    aspect: row.aspect as string,
    avgRating: Number(row.avg_rating),
    mentionCount: Number(row.mention_count)
  }));
}
