import { Component, Input, Output, EventEmitter } from '@angular/core';
import IWorkshop from '../../workshops/models/IWorkshop';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() page_limit: number = Number.MAX_VALUE;
  @Input() page_1: boolean = true;
  @Input() page_2: boolean = true;
  @Input() page_3: boolean = true;
  @Input() loading: boolean = true;
  error: Error | null = null;
  workshops!: IWorkshop[];

  @Output()
  pageChange = new EventEmitter<number>();

  @Output()
  paginationChange = new EventEmitter<number>();

  pagination(page_add: number) {
    if (this.page + page_add >= this.page_limit) {
      this.page_3 = false;
      this.page_2 = false;
      this.page_1 = false;
      return;
    } else {
      this.page_1 = true;
      this.page_2 = true;
      this.page_3 = true;
      if (page_add === -1 && this.page === 1) return;
      this.page = this.page + page_add;
      this.pageChange.emit(this.page);
    }
    //this.getData();
  }

  pagination_by_id(new_page: number) {
    if (new_page > this.page_limit) {
      this.page_3 = false;
      this.page_2 = false;
      this.page_1 = false;
      return;
    }
    this.page = new_page;
    this.paginationChange.emit(this.page);
    //this.getData();
  }
}
