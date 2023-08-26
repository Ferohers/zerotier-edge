import { Show } from 'solid-js';
import { useClient } from '../../Client';
import CheckBox from '../../components/CheckBox';
import Fieldset from '../../components/Fieldset';
import FormControl from '../../components/FormControl';



export default () => {
  const { currentNetwork: network, updateNetwork: update } = useClient();
  const v6AssignMode = () => network().config?.v6AssignMode ?? {};
  const rfc4193 = () => v6AssignMode().rfc4193 ?? false;
  const m6plane = () => v6AssignMode()['6plane'] ?? false;
  // const zt = () => network().config.v6AssignMode.zt ?? false;

  const setRfc4193 = (rfc4193: boolean) => update({
    config: {
      v6AssignMode: {
        ...v6AssignMode(),
        rfc4193
      }
    }
  });

  const set6plane = (m6plane: boolean) => update({
    config: {
      v6AssignMode: {
        ...v6AssignMode(),
        '6plane': m6plane
      }
    }
  });


  // const setZt = (zt: boolean) => update({
  //   config: {
  //     v6AssignMode: {
  //       ...v6AssignMode(),
  //       zt
  //     }
  //   }
  // });

  // const ipAssignmentPools = () => network().config.ipAssignmentPools ?? [];

  // const ipv6AssignmentPools = createMemo(() => ipAssignmentPools().filter(x => x.ipRangeStart?.includes(':')));

  // const [ipv6RangeStart, setIpv6RangeStart] = createSignal('');
  // const [ipv6RangeEnd, setIpv6RangeEnd] = createSignal('');
  // const ipv6RangeValidate = () => ipv6Regex.test(ipv6RangeStart()) && ipv6Regex.test(ipv6RangeEnd());


  return <Fieldset legend="IPv6 Auto-Assign">
    <div>
      <FormControl label={<div>
        <CheckBox class="checkbox-primary align-bottom" checked={rfc4193()} onChange={setRfc4193} />
        <span class="p-2">ZeroTier RFC4193 (/128 for each device)</span>
      </div>}>
        <Show when={rfc4193()}>
          <div class="pl-8 zt-ipv6-rfc4193-template">fd<span class="zt-ipv6-rfc4193-template-hl">8b</span>:<span class="zt-ipv6-rfc4193-template-hl">d512</span>:<span class="zt-ipv6-rfc4193-template-hl">4fd6</span>:<span class="zt-ipv6-rfc4193-template-hl">b510</span>:<span class="zt-ipv6-rfc4193-template-hl">81</span>99:93<span class="zt-ipv6-rfc4193-template-hl2">__</span>:<span class="zt-ipv6-rfc4193-template-hl2">____</span>:<span class="zt-ipv6-rfc4193-template-hl2">____</span></div>
        </Show>
      </FormControl>


    </div>
    <div>
      <FormControl label={<div>
        <CheckBox class="checkbox-primary align-bottom" checked={m6plane()} onChange={set6plane} />
        <span class="p-2">ZeroTier 6PLANE (/80 routable for each device)</span>
      </div>}>
        <Show when={m6plane()}>
          <div class="pl-8 zt-ipv6-rfc4193-template">fc<span class="zt-ipv6-rfc4193-template-hl">5d</span>:<span class="zt-ipv6-rfc4193-template-hl">6002</span>:<span class="zt-ipv6-rfc4193-template-hl">ce</span><span class="zt-ipv6-rfc4193-template-hl2">__</span>:<span class="zt-ipv6-rfc4193-template-hl2">____</span>:<span class="zt-ipv6-rfc4193-template-hl2">____</span>:0000:0000:0001</div>
        </Show>
      </FormControl>
    </div>

    {/* <div>
      <div>
        <CheckBox checked={zt()} onChange={setZt} />
        <span>Auto-Assign from Range</span>
      </div>
    </div>
    <Show when={zt()}>
      <div>
        <div class="flex flex-wrap gap-8">
          <div class="flex flex-col">
            <div>Range Start</div>
            <For each={ipv6AssignmentPools()}>
              {range => <div>{range.ipRangeStart}</div>}
            </For>
          </div>

          <div class="flex flex-col">
            <div>Range End</div>
            <For each={ipv6AssignmentPools()}>
              {range => <div>{range.ipRangeEnd}</div>}
            </For>
          </div>
        </div>
        <div class="flex flex-wrap gap-8">
          <div>
            <div class="flex flex-col">
              <div>Range Start</div>
              <TextInput value={ipv6RangeStart()} onChange={setIpv6RangeStart} />
            </div>
            <div class="flex flex-col">
              <div>Range End</div>
              <TextInput value={ipv6RangeEnd()} onChange={setIpv6RangeEnd} />
            </div>
          </div>
        </div>
        <div>
          <button disabled={!ipv6RangeValidate()}>Submit</button>
        </div>
      </div>
    </Show> */}
  </Fieldset>;
};