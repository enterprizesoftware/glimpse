import { withinElement } from '@/components/common/dom-utils';
import { MouseButton } from '@/components/common/types';
import { Vue } from 'vue/types/vue';

export type Deactivator = (event: Event) => void;

export function createDeactivator(
  instance: Vue,
  executeAfter: (event?: Event) => any
): Deactivator {
  const deactivate = (event: Event) => {
    if ((<MouseEvent>event).button !== MouseButton.Primary) return;
    if (withinElement(instance.$el, event.target!)) return;
    executeAfter(event);
    document.removeEventListener('click', deactivate);
  };
  return deactivate;
}
