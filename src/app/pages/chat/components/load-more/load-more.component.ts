import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {

  constructor() {}

  @Input() count!: number;
  @Output() load = new EventEmitter<void>();

  loadMore() {
    this.load.emit();
  }

  ngOnInit(): void {
  }

}
