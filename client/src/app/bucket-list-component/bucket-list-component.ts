import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BucketListService, BucketItem } from '../services/bucket-list-service';
import { HttpClientXsrfModule } from '@angular/common/http';

@Component({
  selector: 'app-bucket-list-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bucket-list-component.html',
  styleUrls: ['./bucket-list-component.css'],
})
export class BucketListComponent implements OnInit {
  sections: ('landmarks' | 'cities' | 'countries')[] = ['landmarks', 'cities', 'countries'];
  items: { [key: string]: BucketItem[] } = {
    landmarks: [],
    cities: [],
    countries: [],
  };
  newItem: { [key: string]: string } = {
    landmarks: '',
    cities: '',
    countries: '',
  };
  editingId: string | null = null;
  editingName: string = '';

  constructor(private bucketListService: BucketListService) {}

  ngOnInit(): void {
    this.sections.forEach((section) => this.loadItems(section));
  }

  loadItems(section: string) {
    this.bucketListService.getItems(section).subscribe((data) => {
      this.items[section] = data;
    });
  }

  addItem(section: string) {
    const name = this.newItem[section]?.trim();
    if (!name) return;

    console.log('Adding item:', { section, name });

    this.bucketListService.addItem(section, name).subscribe({
      next: (item) => {
        console.log('Item added:', item);
        this.items[section].push(item);
        this.newItem[section] = '';
      },
      error: (error) => {
        console.error('Error adding item:', error);
      },
    });
  }

  deleteItem(section: string, id: string) {
    this.bucketListService.deleteItem(id).subscribe(() => {
      this.items[section] = this.items[section].filter((i) => i._id !== id);
    });
  }

  startEdit(item: BucketItem) {
    this.editingId = item._id!;
    this.editingName = item.name;
  }

  saveEdit(section: string, id: string) {
    const newName = this.editingName.trim();
    if (!newName) return;

    this.bucketListService.editItem(id, newName).subscribe((updated) => {
      const index = this.items[section].findIndex((i) => i._id === id);
      if (index > -1) this.items[section][index] = updated;

      this.editingId = null;
      this.editingName = '';
    });
  }

  toggleVisited(section: string, item: BucketItem) {
    this.bucketListService.toggleVisited(item._id!, !item.visited).subscribe((updated) => {
      item.visited = updated.visited;
    });
  }
}
