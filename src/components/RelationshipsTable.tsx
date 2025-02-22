// components/RelationshipsTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Relationship {
  source: string;
  target: string;
  type: string;
}

interface RelationshipsTableProps {
  relationships: Relationship[];
}

const RelationshipsTable: React.FC<RelationshipsTableProps> = ({ relationships }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Relationship</TableHead>
            <TableHead>Target</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {relationships.map((rel, index) => (
            <TableRow key={index}>
              <TableCell>{rel.source}</TableCell>
              <TableCell>{rel.type}</TableCell>
              <TableCell>{rel.target}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RelationshipsTable;