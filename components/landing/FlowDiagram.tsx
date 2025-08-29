const FlowDiagram = () => {
  return (
    <svg
      width="300"
      height="520"
      viewBox="0 0 400 520"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className=""
    >
      {/* Driver */}
      <rect
        x="150"
        y="30"
        width="100"
        height="50"
        rx="12"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.18)"
      />
      <text
        x="200"
        y="62"
        textAnchor="middle"
        fontSize="16"
        fill="#E6E6E6"
        fontFamily="sans-serif"
      >
        Driver
      </text>

        {/* <!-- Travelus logo --> */}
        <image 
        href="/assets/logo.svg" 
        x="175" 
        y="205" 
        width="50" 
        height="50" 
        />

      {/* Rider */}
      <rect
        x="150"
        y="420"
        width="100"
        height="50"
        rx="12"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.18)"
      />
      <text
        x="200"
        y="452"
        textAnchor="middle"
        fontSize="16"
        fill="#E6E6E6"
        fontFamily="sans-serif"
      >
        Rider
      </text>

      {/* Static guide curves */}
      <path
        id="p-driver-down-left"
        d="M170 80 C150 140, 170 170, 190 230"
        stroke="rgba(230,230,230,0.12)"
        strokeWidth="2"
        fill="none"
      />
      <path
        id="p-driver-down-right"
        d="M230 80 C250 140, 230 170, 210 230"
        stroke="rgba(230,230,230,0.12)"
        strokeWidth="2"
        fill="none"
      />

      <path
        id="p-t-down-left"
        d="M190 230 C170 320, 170 370, 170 420"
        stroke="rgba(230,230,230,0.12)"
        strokeWidth="2"
        fill="none"
      />
      <path
        id="p-t-down-right"
        d="M210 230 C230 320, 230 370, 230 420"
        stroke="rgba(230,230,230,0.12)"
        strokeWidth="2"
        fill="none"
      />

      {/* Reverse paths */}
      <path
        id="p-driver-up-left"
        d="M190 230 C170 170, 150 140, 170 80"
        stroke="rgba(230,230,230,0.12)"
        strokeWidth="0"
        fill="none"
      />
      <path
        id="p-driver-up-right"
        d="M210 230 C230 170, 250 140, 230 80"
        stroke="rgba(230,230,230,0.12)"
        strokeWidth="0"
        fill="none"
      />

      <path
        id="p-t-up-left"
        d="M170 420 C170 370, 170 320, 190 230"
        stroke="rgba(230,230,230,0.12)"
        strokeWidth="0"
        fill="none"
      />
      <path
        id="p-t-up-right"
        d="M230 420 C230 370, 230 320, 210 230"
        stroke="rgba(230,230,230,0.12)"
        strokeWidth="0"
        fill="none"
      />

      {/* Animated circles */}
      <circle r="2" fill="#4ade80">
        <animateMotion dur="2.4s" repeatCount="indefinite">
          <mpath href="#p-driver-down-left" />
        </animateMotion>
      </circle>

      <circle r="2" fill="#9333ea">
        <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite">
          <mpath href="#p-driver-up-right" />
        </animateMotion>
      </circle>

      <circle r="2" fill="#9333ea">
        <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite">
          <mpath href="#p-t-up-left" />
        </animateMotion>
      </circle>

      <circle r="2" fill="#4ade80">
        <animateMotion dur="2.4s" repeatCount="indefinite">
          <mpath href="#p-t-down-right" />
        </animateMotion>
      </circle>
    </svg>
  );
};

export default FlowDiagram;
