type Point = { x: number, y: number }
type Reading = { midi: number | null, t: number }
type Sample = { midi: number | null, target?: number | null | undefined }
type FitProportion = {
	aligned: Point[],
	errs: number[],
	mean: number,
	raw: number,
	scale: number,
	worst: number
}
type LineStats = { dev: number, endP: number, plen: number, score: number }
type Drills = {
	avg: (a: number[]) => number,
	fitProportion: (g: Point[], t: Point[]) => FitProportion | null,
	lineStats: (A: Point, B: Point, pts: Point[]) => LineStats,
	randomShape: (n: number, rand?: () => number, margin?: number, min_gap?: number) => Point[]
}
type DetectOptions = { maxFreq?: number, minFreq?: number, minRms?: number, threshold?: number }
type TrackerOptions = { agree?: number, ease?: number, hold?: number, jump?: number, snap?: number, within?: number }
type TakeStats = { inTune: number | null, meanCents: number | null, scored: number, voiced: number }
type Pitch = {
	RANGES: { hi: number, label: string, lo: number }[],
	detectPitch: (buf: ArrayLike<number>, sample_rate: number, options?: DetectOptions) => { clarity: number, freq: number } | null,
	freqToMidi: (freq: number) => number,
	guideTarget: (elapsed: number, step_dur: number, lo: number) => number | null | undefined,
	midiToFreq: (midi: number) => number,
	noteName: (midi: number) => string,
	pitchTracker: (options?: TrackerOptions) => (t: number, midi: number | null | undefined) => number | null,
	scalePattern: (lo: number) => number[],
	solfa: (midi: number) => string | undefined,
	steadyNote: (midi: number | null | undefined, prev: number | null | undefined) => number | null | undefined,
	takeFileName: (date: Date, mime: string) => string,
	takeStats: (samples: Sample[], tolerance?: number) => TakeStats,
	viewRange: (samples: Reading[], lo: number, from: number, to: number) => { high: number, low: number }
}
type Reply = {
	id: number,
	result: {
		exceptionDetails?: { exception?: { description?: string }, text: string },
		result: { value: unknown }
	}
}
type TestPage = {
	close: () => Promise<Response>,
	eval: <T = unknown>(expression: string) => Promise<T>,
	until: (expression: string, ms?: number) => Promise<void>
}
declare var Drills: Drills
declare var Pitch: Pitch